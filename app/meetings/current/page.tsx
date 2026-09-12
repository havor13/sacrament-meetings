// app/meetings/current/page.tsx
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingPage() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const meetings = getMeetings(today);

  if (meetings.length === 0) {
    // If no meeting found for today, redirect to /meetings
    redirect('/meetings');
  }

  // Redirect to the first meeting found for today
  redirect(`/meetings/${meetings[0].id}`);
}
