'use client';

import { useActionState, useState } from 'react';
import type { SacramentMeeting, SpeakerItem, WardBusinessItem } from '@/lib/types';
import type { MeetingFormState } from '@/lib/meeting-form-state';
import { initialMeetingFormState } from '@/lib/meeting-form-state';

type Action = (
  prevState: MeetingFormState,
  formData: FormData
) => Promise<MeetingFormState>;

export default function MeetingForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: Action;
  defaultValues?: SacramentMeeting;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialMeetingFormState
  );

  const [speakers, setSpeakers] = useState<SpeakerItem[]>(
    defaultValues?.speakers ?? []
  );
  const [wardBusiness, setWardBusiness] = useState<WardBusinessItem[]>(
    defaultValues?.wardBusiness ?? []
  );

  const fieldError = (name: string) =>
    state.errors?.[name]?.[0];

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state.message && (
        <p role="alert" aria-live="polite" className="text-red-700 font-medium">
          {state.message}
        </p>
      )}

      {/* Date */}
      <div>
        <label htmlFor="date" className="block font-medium">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={defaultValues?.date}
          aria-describedby="date-error"
          className="border rounded px-3 py-2 w-full"
        />
        <div id="date-error" aria-live="polite" className="text-red-700 text-sm">
          {fieldError('date')}
        </div>
      </div>

      {/* Meeting type */}
      <div>
        <label htmlFor="meetingType" className="block font-medium">
          Meeting type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={defaultValues?.meetingType ?? 'regular'}
          aria-describedby="meetingType-error"
          className="border rounded px-3 py-2 w-full"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div id="meetingType-error" aria-live="polite" className="text-red-700 text-sm">
          {fieldError('meetingType')}
        </div>
      </div>

      {/* Presiding / Conducting */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="presiding" className="block font-medium">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={defaultValues?.presiding}
            aria-describedby="presiding-error"
            className="border rounded px-3 py-2 w-full"
          />
          <div id="presiding-error" aria-live="polite" className="text-red-700 text-sm">
            {fieldError('presiding')}
          </div>
        </div>
        <div>
          <label htmlFor="conducting" className="block font-medium">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={defaultValues?.conducting}
            aria-describedby="conducting-error"
            className="border rounded px-3 py-2 w-full"
          />
          <div id="conducting-error" aria-live="polite" className="text-red-700 text-sm">
            {fieldError('conducting')}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div>
        <label htmlFor="announcements" className="block font-medium">
          Announcements <span className="font-normal text-sm">(one per line)</span>
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={defaultValues?.announcements?.join('\n')}
          aria-describedby="announcements-error"
          className="border rounded px-3 py-2 w-full"
        />
        <div id="announcements-error" aria-live="polite" className="text-red-700 text-sm">
          {fieldError('announcements')}
        </div>
      </div>

      {/* Opening prayer / hymn */}
      <HymnFields
        legend="Opening hymn"
        numberName="openingHymnNumber"
        titleName="openingHymnTitle"
        defaultNumber={defaultValues?.openingHymn?.number ?? undefined}
        defaultTitle={defaultValues?.openingHymn?.title}
        error={fieldError('openingHymn')}
      />
      <div>
        <label htmlFor="openingPrayer" className="block font-medium">
          Opening prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={defaultValues?.openingPrayer}
          aria-describedby="openingPrayer-error"
          className="border rounded px-3 py-2 w-full"
        />
        <div id="openingPrayer-error" aria-live="polite" className="text-red-700 text-sm">
          {fieldError('openingPrayer')}
        </div>
      </div>

      {/* Ward business */}
      <fieldset className="border rounded p-4">
        <legend className="font-medium px-1">Ward business</legend>
        {wardBusiness.map((item, i) => (
          <div key={i} className="flex gap-2 items-start mb-2">
            <label className="sr-only" htmlFor={`wardBusiness-${i}`}>
              Ward business item {i + 1}
            </label>
            <input
              id={`wardBusiness-${i}`}
              type="text"
              value={item.description}
              onChange={(e) => {
                const next = [...wardBusiness];
                next[i] = { description: e.target.value };
                setWardBusiness(next);
              }}
              className="border rounded px-3 py-2 flex-1"
            />
            <button
              type="button"
              onClick={() => setWardBusiness(wardBusiness.filter((_, idx) => idx !== i))}
              aria-label={`Remove ward business item ${i + 1}`}
              className="text-red-700 px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setWardBusiness([...wardBusiness, { description: '' }])}
          className="text-blue-700 underline text-sm"
        >
          + Add ward business item
        </button>
        <input type="hidden" name="wardBusiness" value={JSON.stringify(wardBusiness)} />
        <div aria-live="polite" className="text-red-700 text-sm">
          {fieldError('wardBusiness')}
        </div>
      </fieldset>

      {/* Stake business */}
      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={defaultValues?.stakeBusiness}
        />
        <label htmlFor="stakeBusiness">Stake business conducted</label>
      </div>

      {/* Sacrament hymn */}
      <HymnFields
        legend="Sacrament hymn"
        numberName="sacramentHymnNumber"
        titleName="sacramentHymnTitle"
        defaultNumber={defaultValues?.sacramentHymn?.number ?? undefined}
        defaultTitle={defaultValues?.sacramentHymn?.title}
        error={fieldError('sacramentHymn')}
      />

      {/* Speakers */}
      <fieldset className="border rounded p-4">
        <legend className="font-medium px-1">Speakers / musical numbers</legend>
        {speakers.map((item, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-start mb-2">
            <label className="sr-only" htmlFor={`speaker-name-${i}`}>
              Speaker {i + 1} name
            </label>
            <input
              id={`speaker-name-${i}`}
              type="text"
              placeholder="Name"
              value={item.name}
              onChange={(e) => {
                const next = [...speakers];
                next[i] = { ...next[i], name: e.target.value };
                setSpeakers(next);
              }}
              className="border rounded px-3 py-2"
            />
            <label className="sr-only" htmlFor={`speaker-topic-${i}`}>
              Speaker {i + 1} topic
            </label>
            <input
              id={`speaker-topic-${i}`}
              type="text"
              placeholder="Topic"
              value={item.topic}
              onChange={(e) => {
                const next = [...speakers];
                next[i] = { ...next[i], topic: e.target.value };
                setSpeakers(next);
              }}
              className="border rounded px-3 py-2"
            />
            <label className="sr-only" htmlFor={`speaker-type-${i}`}>
              Speaker {i + 1} type
            </label>
            <select
              id={`speaker-type-${i}`}
              value={item.type}
              onChange={(e) => {
                const next = [...speakers];
                next[i] = {
                  ...next[i],
                  type: e.target.value as SpeakerItem['type'],
                };
                setSpeakers(next);
              }}
              className="border rounded px-2 py-2"
            >
              <option value="speaker">Speaker</option>
              <option value="musical-number">Musical number</option>
            </select>
            <button
              type="button"
              onClick={() => setSpeakers(speakers.filter((_, idx) => idx !== i))}
              aria-label={`Remove speaker ${i + 1}`}
              className="text-red-700 px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setSpeakers([...speakers, { name: '', topic: '', type: 'speaker' }])
          }
          className="text-blue-700 underline text-sm"
        >
          + Add speaker
        </button>
        <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />
        <div aria-live="polite" className="text-red-700 text-sm">
          {fieldError('speakers')}
        </div>
      </fieldset>

      {/* Closing hymn / prayer */}
      <HymnFields
        legend="Closing hymn"
        numberName="closingHymnNumber"
        titleName="closingHymnTitle"
        defaultNumber={defaultValues?.closingHymn?.number ?? undefined}
        defaultTitle={defaultValues?.closingHymn?.title}
        error={fieldError('closingHymn')}
      />
      <div>
        <label htmlFor="closingPrayer" className="block font-medium">
          Closing prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={defaultValues?.closingPrayer}
          aria-describedby="closingPrayer-error"
          className="border rounded px-3 py-2 w-full"
        />
        <div id="closingPrayer-error" aria-live="polite" className="text-red-700 text-sm">
          {fieldError('closingPrayer')}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {isPending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}

function HymnFields({
  legend,
  numberName,
  titleName,
  defaultNumber,
  defaultTitle,
  error,
}: {
  legend: string;
  numberName: string;
  titleName: string;
  defaultNumber?: number;
  defaultTitle?: string;
  error?: string;
}) {
  return (
    <fieldset className="border rounded p-4">
      <legend className="font-medium px-1">{legend}</legend>
      <div className="grid grid-cols-[100px_1fr] gap-2">
        <div>
          <label htmlFor={numberName} className="block text-sm">
            Number
          </label>
          <input
            id={numberName}
            name={numberName}
            type="number"
            defaultValue={defaultNumber ?? ''}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor={titleName} className="block text-sm">
            Title
          </label>
          <input
            id={titleName}
            name={titleName}
            type="text"
            defaultValue={defaultTitle}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div aria-live="polite" className="text-red-700 text-sm">
        {error}
      </div>
    </fieldset>
  );
}