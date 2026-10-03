'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home', adminOnly: false },
  { href: '/meetings', label: 'Meetings', adminOnly: false },
  { href: '/meetings/current', label: 'Current Sunday', adminOnly: false },
  { href: '/meetings/new', label: 'New Meeting', adminOnly: true },
];

function isLinkActive(pathname: string, href: string) {
  // "Meetings" stays active on /meetings and on detail/edit pages like /meetings/5
  if (href === '/meetings') {
    return pathname === '/meetings' || /^\/meetings\/\d+/.test(pathname);
  }
  return pathname === href;
}

export default function NavLinks({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const visibleLinks = links.filter((link) => !link.adminOnly || isLoggedIn);

  return (
    <nav className="flex gap-4" aria-label="Primary navigation">
      {visibleLinks.map((link) => {
        const isActive = isLinkActive(pathname, link.href);
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