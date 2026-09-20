// app/(public)/meetings/layout.tsx
export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return <section aria-label="Meetings">{children}</section>;
}