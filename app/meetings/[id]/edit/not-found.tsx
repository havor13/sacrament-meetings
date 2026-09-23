import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-2">Meeting not found</h1>
      <p className="mb-4 text-gray-700">
        We couldn&apos;t find a meeting with that ID. It may have been deleted.
      </p>
      <Link href="/meetings" className="underline">
        Back to meetings
      </Link>
    </div>
  );
}