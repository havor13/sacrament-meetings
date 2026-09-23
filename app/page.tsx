import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl py-20 px-8 text-center sm:text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        
        {/* Logo container with relative positioning for Image fill */}
        <div className="relative w-40 h-16">
          <Image
            src="/pakyi-branch-logo.svg"
            alt="Pakyi Branch Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-black dark:text-zinc-50">
          Sacrament Meeting Planner
        </h1>
        <p className="mt-4 max-w-md text-lg text-zinc-700 dark:text-zinc-400">
          Plan, manage, and review sacrament meeting agendas. View current and past programs, announcements, hymns, and speakers.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/meetings/current"
            aria-label="View current meeting agenda"
            className="flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-white transition hover:bg-blue-700"
          >
            View Current Meeting
          </Link>
          <Link
            href="/meetings"
            aria-label="View all meetings"
            className="flex h-12 items-center justify-center rounded-full border border-blue-600 px-6 text-blue-600 transition hover:bg-blue-100"
          >
            All Meetings
          </Link>
        </div>
      </main>
    </div>
  );
}
