'use client';

import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 max-w-md mx-auto text-center" role="alert" aria-live="polite">
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <p className="mb-4 text-gray-700">
        We couldn&apos;t load this meeting. Please try again, or go back to the meetings list.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-blue-700 text-white rounded px-4 py-2"
        >
          Try Again
        </button>
        <Link href="/meetings" className="underline px-4 py-2">
          Back to meetings
        </Link>
      </div>
    </div>
  );
}