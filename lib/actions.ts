'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { auth, signIn } from '@/auth';
import {
  addMeeting,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from './meetings-db';
import type { MeetingFormState } from './meeting-form-state';

// ---------- Auth helpers ----------

/**
 * Server-side guard. The proxy only protects pages, so every mutation
 * must verify the session itself. Unauthenticated callers are sent to /login.
 */
async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  return session;
}

/**
 * Sign-in action used by the login form (useActionState).
 * Returns an error message string on failure; on success signIn redirects.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/meetings',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong. Please try again.';
      }
    }
    // Re-throw so Next.js can handle the redirect after a successful sign-in
    throw error;
  }
}

// ---------- Zod schema ----------

const HymnSchema = z.object({
  number: z.coerce.number().int().positive().nullable(),
  title: z.string().min(1, 'Hymn title is required'),
});

const SpeakerItemSchema = z.object({
  name: z.string().min(1, 'Speaker name is required'),
  topic: z.string().min(1, 'Topic is required'),
  type: z.enum(['speaker', 'musical-number']),
});

const WardBusinessItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    error: 'Select a meeting type',
  }),
  presiding: z.string().min(1, 'Presiding is required'),
  conducting: z.string().min(1, 'Conducting is required'),
  announcements: z.array(z.string()).default([]),
  openingHymn: HymnSchema,
  openingPrayer: z.string().min(1, 'Opening prayer is required'),
  wardBusiness: z.array(WardBusinessItemSchema).default([]),
  stakeBusiness: z.coerce.boolean().default(false),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerItemSchema).default([]),
  closingHymn: HymnSchema,
  closingPrayer: z.string().min(1, 'Closing prayer is required'),
});

// ---------- FormData -> raw object ----------

function parseMeetingFormData(formData: FormData) {
  const str = (key: string) => (formData.get(key) as string) ?? '';
  const json = (key: string) => {
    const raw = formData.get(key) as string;
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  return {
    date: str('date'),
    meetingType: str('meetingType'),
    presiding: str('presiding'),
    conducting: str('conducting'),
    announcements: str('announcements')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
    openingHymn: {
      number: str('openingHymnNumber') || null,
      title: str('openingHymnTitle'),
    },
    openingPrayer: str('openingPrayer'),
    wardBusiness: json('wardBusiness'),
    stakeBusiness: str('stakeBusiness') === 'on',
    sacramentHymn: {
      number: str('sacramentHymnNumber') || null,
      title: str('sacramentHymnTitle'),
    },
    speakers: json('speakers'),
    closingHymn: {
      number: str('closingHymnNumber') || null,
      title: str('closingHymnTitle'),
    },
    closingPrayer: str('closingPrayer'),
  };
}

// ---------- Server Actions (protected) ----------

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await requireSession();

  const parsed = MeetingFormSchema.safeParse(parseMeetingFormData(formData));

  if (!parsed.success) {
    return {
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await addMeeting(parsed.data);
  } catch (err) {
    console.error('createMeeting failed:', err);
    return {
      message: 'Something went wrong saving the meeting. Please try again.',
      errors: {},
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await requireSession();

  const parsed = MeetingFormSchema.safeParse(parseMeetingFormData(formData));

  if (!parsed.success) {
    return {
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const updated = await updateMeetingDb(id, parsed.data);
    if (!updated) {
      return { message: 'That meeting no longer exists.', errors: {} };
    }
  } catch (err) {
    console.error('updateMeeting failed:', err);
    return {
      message: 'Something went wrong updating the meeting. Please try again.',
      errors: {},
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData) {
  await requireSession();

  const id = Number(formData.get('id'));

  try {
    await deleteMeetingDb(id);
  } catch (err) {
    console.error('deleteMeeting failed:', err);
    throw new Error('Failed to delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}