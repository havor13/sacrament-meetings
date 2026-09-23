// components/Header.tsx
export default function Header() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Pakyi Branch Sacrament Meetings</h1>
        <span className="text-sm" aria-label="Current date">{today}</span>
      </div>
    </header>
  );
}
