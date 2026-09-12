import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const announcements = meeting.announcements ?? [];

  return (
    <div className="prose max-w-none">
      <h1 className="text-2xl font-bold mb-4">
        Sacrament Meeting — {meeting.date}
      </h1>
      <p><strong>Presiding:</strong> {meeting.presiding}</p>
      <p><strong>Conducting:</strong> {meeting.conducting}</p>

      {announcements.length > 0 && (
        <section aria-label="Announcements">
          <h2>Announcements</h2>
          <ul>
            {announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Opening Hymn">
        <h2>Opening Hymn</h2>
        <p>{meeting.openingHymn.number} — {meeting.openingHymn.title}</p>
        <p><strong>Opening Prayer:</strong> {meeting.openingPrayer}</p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section aria-label="Ward Business">
          <h2>Ward Business</h2>
          <ul>
            {meeting.wardBusiness.map((wb, i) => (
              <li key={i}>{wb.description}</li>
            ))}
          </ul>
          {meeting.stakeBusiness && <p><em>Stake business conducted</em></p>}
        </section>
      )}

      <section aria-label="Sacrament Hymn">
        <h2>Sacrament Hymn</h2>
        <p>{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}</p>
      </section>

      {meeting.speakers.length > 0 && (
        <section aria-label="Speakers and Musical Numbers">
          <h2>Speakers & Musical Numbers</h2>
          <ul>
            {meeting.speakers.map((s, i) => (
              <li key={i}>
                {s.type === 'speaker'
                  ? `${s.name} — ${s.topic}`
                  : `${s.name} (Musical Number)`}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Closing Hymn">
        <h2>Closing Hymn</h2>
        <p>{meeting.closingHymn.number} — {meeting.closingHymn.title}</p>
        <p><strong>Closing Prayer:</strong> {meeting.closingPrayer}</p>
      </section>
    </div>
  );
}
