import Link from 'next/link';
import { auth } from '@/auth';

export default async function MeetingAdminLinks({ id }: { id: number }) {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <Link
      href={`/meetings/${id}/edit`}
      className="inline-block rounded border border-blue-700 px-3 py-1 text-blue-700 hover:bg-blue-50"
    >
      Edit
    </Link>
  );
}