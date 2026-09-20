// lib/format.ts
import type { Hymn, MeetingType } from './types';

export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  testimony: 'Testimony Meeting',
  regular: 'Regular Meeting',
  stake: 'Stake Meeting',
  general: 'General Conference',
  special: 'Special Meeting',
};

export function formatHymn(h: Hymn): string {
  if (h.number == null) return h.title || 'Not applicable';
  return `#${h.number} ${h.title}`;
}

const MAX_INT4 = 2_147_483_647;

// Returns a valid id or null. Shared by the API route and the pages.
export function parseMeetingId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  return n > 0 && n <= MAX_INT4 ? n : null;
}

// Formats a YYYY-MM-DD string without letting the time zone shift the day
export function formatMeetingDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    dateStyle: 'full',
    timeZone: 'UTC',
  });
}