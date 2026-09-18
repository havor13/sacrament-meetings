// app/meetings/loading.tsx
export default function Loading() {
  return (
    <main className="p-6 flex items-center justify-center h-screen">
      <div className="text-center" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold">Loading meetings...</h1>
        <p className="text-gray-600 mt-2">Please wait while we fetch your data.</p>
      </div>
    </main>
  );
}
