// lib/meetings-db.ts
import { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward picnic next Saturday', 'Temple trip on Friday'],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Brown',
    wardBusiness: [{ description: 'New callings sustained' }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Elder Johnson', topic: 'Faith in Christ', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 152, title: 'God Be With You Till We Meet Again' },
    closingPrayer: 'Brother White',
  },
  {
    id: 2,
    date: '2026-09-13',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: [], // always present, even if empty
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Green',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [], // testimony meeting, no pre-assigned speakers
    closingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    closingPrayer: 'Brother Black',
  },
];

// ✅ Export functions so they can be imported elsewhere
export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (!date) return meetings;
  return meetings.filter((m) => m.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((m) => m.id === id);
}
