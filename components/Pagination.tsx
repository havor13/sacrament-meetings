// components/Pagination.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const linkClass =
  'rounded border border-gray-400 px-3 py-1 text-blue-800 hover:bg-blue-50 focus:outline-2 focus:outline-blue-600';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-4">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)} className={linkClass}>
          Previous
        </Link>
      )}
      <span className="text-gray-900">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)} className={linkClass}>
          Next
        </Link>
      )}
    </nav>
  );
}