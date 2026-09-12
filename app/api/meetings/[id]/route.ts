// app/api/meetings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ params is a Promise in API routes
) {
  const { id } = await params; // ✅ unwrap the Promise
  const meeting = getMeetingById(parseInt(id, 10));

  if (!meeting) {
    return NextResponse.json({ error: `Meeting ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
