// app/meetings/[id]/page.tsx
export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ unwrap the Promise

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return <p>Error: {res.status}</p>;
  }

  const meeting = await res.json();

  return (
    <div>
      <h1>{meeting.title}</h1>
      <p>{meeting.date}</p>
      <p>{meeting.conductor}</p>
      {/* render other fields as needed */}
    </div>
  );
}
