// app/meetings/layout.tsx
import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto p-4" aria-label="Meetings section">
      <h2 className="text-lg font-semibold mb-4">Meetings</h2>
      <NavLinks />
      <div className="mt-4">{children}</div>
    </section>
  );
}
