'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { signUp, type SignUpState } from '@/lib/auth-actions';

const initialState: SignUpState = { message: null, errors: {} };

function Field({
  id,
  label,
  type = 'text',
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-describedby={`${id}-error`}
        aria-invalid={error ? true : undefined}
        className="border rounded px-3 py-2 w-full"
      />
      <div id={`${id}-error`} aria-live="polite" className="text-red-700 text-sm">
        {error}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const err = (name: string) => state.errors?.[name]?.[0];

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Create an account</h1>
      <p className="mb-4 text-gray-700">
        For the branch presidency and clerks. You need the access code from your
        branch president.
      </p>

      <form action={formAction} className="space-y-4">
        {state.message && (
          <p role="alert" className="text-red-700 font-medium">
            {state.message}
          </p>
        )}

        <Field id="name" label="Full name" autoComplete="name" error={err('name')} />
        <Field id="email" label="Email" type="email" autoComplete="email" error={err('email')} />
        <Field
          id="password"
          label="Password (8+ characters)"
          type="password"
          autoComplete="new-password"
          error={err('password')}
        />

        <div>
          <label htmlFor="role" className="block font-medium">
            Calling
          </label>
          <select
            id="role"
            name="role"
            defaultValue=""
            aria-describedby="role-error"
            className="border rounded px-3 py-2 w-full"
          >
            <option value="" disabled>
              Select your calling
            </option>
            <option value="branch_president">Branch President</option>
            <option value="counselor">Counselor</option>
            <option value="clerk">Clerk</option>
          </select>
          <div id="role-error" aria-live="polite" className="text-red-700 text-sm">
            {err('role')}
          </div>
        </div>

        <Field id="accessCode" label="Access code" type="password" error={err('accessCode')} />

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {isPending ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-700 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}