'use client';

import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingButton({ id }: { id: number }) {
  return (
    <form
      action={deleteMeeting}
      onSubmit={(e) => {
        if (!confirm('Delete this meeting? This cannot be undone.')) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-700 border border-red-700 rounded px-4 py-2 hover:bg-red-50"
      >
        Delete this meeting
      </button>
    </form>
  );
}