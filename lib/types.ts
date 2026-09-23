// lib/types.ts
export type MeetingType = 'testimony' | 'regular' | 'stake' | 'general' | 'special';

export interface Hymn {
  number: number | null; // null for stake/general meetings with no hymns
  title: string;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string; // ISO date string (YYYY-MM-DD)
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[]; // always an array
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}