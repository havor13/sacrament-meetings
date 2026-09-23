// app/(public)/meetings/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}