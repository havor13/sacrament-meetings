'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [error, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required className="rounded border p-2" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" minLength={6} required className="rounded border p-2" />
      <button type="submit" aria-disabled={isPending} disabled={isPending} className="rounded bg-blue-700 p-2 text-white">
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <p role="alert" className="text-red-700">{error}</p>}
    </form>
  );
}