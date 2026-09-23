// app/(public)/meetings/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import { MEETING_TYPE_LABELS, formatHymn, parseMeetingId } from '@/lib/format';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meetingId = parseMeetingId(id);
  if (meetingId === null) notFound();

  const meeting = await getMeetingById(meetingId);
  if (!meeting) notFound();

  // Parse as UTC and format as UTC so the date can't shift by a day
  const dateLabel = new Date(`${meeting.date}T00:00:00Z`).toLocaleDateString(
    'en-US',
    { dateStyle: 'full', timeZone: 'UTC' }
  );

  return (
    <article>
      <h1>{dateLabel}</h1>
      <p>{MEETING_TYPE_LABELS[meeting.meetingType]}</p>

      <p>Presiding: {meeting.presiding}</p>
      {meeting.conducting && <p>Conducting: {meeting.conducting}</p>}

      {meeting.announcements.length > 0 && (
        <section>
          <h2>Announcements</h2>
          <ul>
            {meeting.announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Program</h2>
        <p>Opening Hymn: {formatHymn(meeting.openingHymn)}</p>
        {meeting.openingPrayer && <p>Invocation: {meeting.openingPrayer}</p>}

        {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
          <>
            <h3>Ward Business</h3>
            <ul>
              {meeting.wardBusiness.map((b, i) => (
                <li key={i}>{b.description}</li>
              ))}
              {meeting.stakeBusiness && <li>Stake business</li>}
            </ul>
          </>
        )}

        <p>Sacrament Hymn: {formatHymn(meeting.sacramentHymn)}</p>

        {meeting.speakers.length > 0 && (
          <>
            <h3>Speakers</h3>
            <ul>
              {meeting.speakers.map((s, i) => (
                <li key={i}>
                  {s.name}
                  {s.type === 'musical-number' ? ' (musical number)' : ''}
                  {s.topic && ` — ${s.topic}`}
                </li>
              ))}
            </ul>
          </>
        )}

        <p>Closing Hymn: {formatHymn(meeting.closingHymn)}</p>
        {meeting.closingPrayer && <p>Benediction: {meeting.closingPrayer}</p>}
      </section>
    </article>
  );
}