// app/api/meetings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date'); // optional ?date=YYYY-MM-DD
  const meetings = getMeetings(date);
  return NextResponse.json(meetings);
}
