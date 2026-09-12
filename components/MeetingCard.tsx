// components/MeetingCard.tsx
import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold">
        {meeting.date} — {meeting.meetingType?.toUpperCase() || 'Meeting'}
      </h2>
      <p className="text-sm text-gray-600">
        Presiding: {meeting.presiding} | Conducting: {meeting.conducting}
      </p>
      <p className="mt-2 text-gray-700">
        Opening Hymn: {meeting.openingHymn.number} — {meeting.openingHymn.title}
      </p>
      <p className="text-gray-700">Closing Hymn: {meeting.closingHymn.title}</p>

      <Link
        href={`/meetings/${meeting.id}`}
        aria-label={`View details for meeting on ${meeting.date}`}
        className="mt-3 inline-block text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
