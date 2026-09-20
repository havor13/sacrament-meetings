// app/api/meetings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';
import { parseMeetingId } from '@/lib/format';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Digits only: rejects "abc", "1abc", "1.5", "-1", and out-of-range numbers
  const meetingId = parseMeetingId(id);
  if (meetingId === null) {
    return NextResponse.json(
      { error: `Invalid meeting id "${id}". Use a positive integer.` },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json({ error: `Meeting ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(meeting);
}