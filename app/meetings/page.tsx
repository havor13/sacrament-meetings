// app/meetings/page.tsx
import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

export default async function MeetingsPage() {
  // Use absolute URL for fetch in server components
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });

  if (!res.ok) {
    return <p>Error: {res.status}</p>;
  }

  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Meetings</h1>
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
