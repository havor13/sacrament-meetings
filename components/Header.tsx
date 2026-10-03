// components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Header() {
  const session = await auth();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
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

        {/* Date + auth controls */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm sm:text-base" aria-label="Current date">
            {today}
          </span>
          {session?.user ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="rounded border border-white px-3 py-1 text-sm hover:bg-white hover:text-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}