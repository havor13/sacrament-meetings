// components/MeetingCard.tsx
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { MEETING_TYPE_LABELS, formatMeetingDate } from '@/lib/format';

export function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const speakerNames = meeting.speakers
    .filter((s) => s.type === 'speaker')
    .map((s) => s.name);

  return (
    <article className="mb-4 rounded border border-gray-300 p-4">
      <h2 className="text-lg font-semibold">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-800 hover:underline focus:outline-2 focus:outline-blue-600"
        >
          {formatMeetingDate(meeting.date)}
        </Link>
      </h2>
      <p className="text-gray-800">{MEETING_TYPE_LABELS[meeting.meetingType]}</p>
      <p className="text-gray-800">Presiding: {meeting.presiding}</p>
      {meeting.conducting && (
        <p className="text-gray-800">Conducting: {meeting.conducting}</p>
      )}
      {speakerNames.length > 0 && (
        <p className="text-gray-800">Speakers: {speakerNames.join(', ')}</p>
      )}
    </article>
  );
}