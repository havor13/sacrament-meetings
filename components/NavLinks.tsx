'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'Current Sunday' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4" aria-label="Primary navigation">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={`px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              isActive ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
