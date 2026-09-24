// components/Header.tsx
import Image from "next/image";

export default function Header() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-32 h-12">
            <Image
              src="/pakyi-branch-logo.svg"
              alt="Pakyi Branch Sacrament Meeting Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold">
            Pakyi Branch Sacrament Meetings
          </h1>
        </div>

        {/* Current date */}
        <span
          className="text-sm sm:text-base"
          aria-label="Current date"
        >
          {today}
        </span>
      </div>
    </header>
  );
}
