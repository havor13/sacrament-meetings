import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import DeleteMeetingButton from '@/components/DeleteMeetingButton';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Meeting</h1>
      <MeetingForm
        action={updateMeetingWithId}
        defaultValues={meeting}
        submitLabel="Save changes"
      />

      <div className="mt-8 pt-6 border-t max-w-2xl">
        <DeleteMeetingButton id={id} />
      </div>
    </div>
  );
}