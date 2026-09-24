export type MeetingFormState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export const initialMeetingFormState: MeetingFormState = {
  message: null,
  errors: {},
};