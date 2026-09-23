'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from './meetings-db';
import type { MeetingFormState } from './meeting-form-state';

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

// ---------- Server Actions ----------

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
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
  const id = Number(formData.get('id'));

  try {
    await deleteMeetingDb(id);
  } catch (err) {
    console.error('deleteMeeting failed:', err);
    throw new Error('Failed to delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
}