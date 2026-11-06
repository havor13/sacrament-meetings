'use server';

import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const sql = neon(process.env.DATABASE_URL!);

const SignUpSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
  role: z.enum(['branch_president', 'counselor', 'clerk'], {
    error: 'Select your calling',
  }),
  accessCode: z.string().min(1, 'Access code is required'),
});

export type SignUpState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, password, role, accessCode } = parsed.data;

  if (accessCode !== process.env.UNIT_ACCESS_CODE) {
    return { message: null, errors: { accessCode: ['Incorrect access code'] } };
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${name}, ${email.toLowerCase()}, ${passwordHash}, ${role})
    `;
  } catch (err) {
    if ((err as { code?: string }).code === '23505') {
      return { message: null, errors: { email: ['That email is already registered'] } };
    }
    console.error('signUp failed:', err);
    return { message: 'Could not create the account. Please try again.', errors: {} };
  }

  redirect('/login');
}