// app/api/meetings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllMeetings, getMeetingByDate } from '@/lib/meetings-db';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (date !== null) {
    if (!isValidDate(date)) {
      return NextResponse.json(
        { error: 'Invalid date. Use YYYY-MM-DD.' },
        { status: 400 }
      );
    }
    const meeting = await getMeetingByDate(date);
    return NextResponse.json(meeting ? [meeting] : []);
  }

  const meetings = await getAllMeetings();
  return NextResponse.json(meetings);
}