// app/(public)/meetings/current/page.tsx
import { redirect } from 'next/navigation';
import { getMeetingByDate } from '@/lib/meetings-db';

// Vercel runs in UTC, so compute "today" in the ward's own time zone
const WARD_TIME_ZONE = 'America/Denver'; // set to your ward's IANA time zone

export const dynamic = 'force-dynamic'; // evaluate on every request, not at build time

function getThisSunday(): string {
  // the en-CA locale formats dates as YYYY-MM-DD
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: WARD_TIME_ZONE,
  }).format(new Date());

  // Do the day arithmetic in UTC so it can't drift with the server's time zone
  const d = new Date(`${today}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + ((7 - d.getUTCDay()) % 7)); // 0 days if today is Sunday
  return d.toISOString().slice(0, 10);
}

export default async function CurrentMeetingPage() {
  const meeting = await getMeetingByDate(getThisSunday());

  // No meeting planned yet for this Sunday
  if (!meeting) redirect('/meetings');

  redirect(`/meetings/${meeting.id}`);
}