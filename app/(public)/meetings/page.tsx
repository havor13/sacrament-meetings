// app/(public)/meetings/page.tsx
import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { MeetingCard } from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Meetings',
  description: 'Browse and search the Pakyi Branch sacrament meeting schedule.',
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Math.max(1, Math.floor(Number(searchParams?.page)) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <MeetingSearch />
      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        meetings.map((m) => <MeetingCard key={m.id} meeting={m} />)
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
}