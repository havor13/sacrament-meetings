import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Bishopric Sign In</h1>
      <LoginForm />
      <p>
        No account yet?{' '}
        <Link href="/signup" className="text-blue-700 underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}