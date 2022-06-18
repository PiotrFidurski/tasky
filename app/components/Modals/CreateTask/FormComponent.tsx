import { isMatch, isValid } from 'date-fns';
import React, { useEffect } from 'react';
import { z } from 'zod';
import { ZodTaskErrors } from '~/validation/task';

import { useFetcher, useNavigate, useParams, useSearchParams } from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';

import { formatDate } from '~/utils/date';
import { useErrors } from '~/utils/hooks/useErrors';

import { CREATE_DRAFT } from '../actionTypes';

type ActionData = z.infer<typeof ZodTaskErrors>;

type FormComponentProps = {
  draft: { title: string; body: string };
};

export function FormComponent({ draft }: FormComponentProps) {
  const fetcher = useFetcher<ActionData & { success: boolean }>();

  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get('selectedDate') ?? formatDate();

  const navigate = useNavigate();

  const { day } = useParams<'day'>();

  const { fieldErrors } = useErrors(fetcher.data);

  const handleTaskDraftSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetcher.submit(e.currentTarget, {
      method: 'post',
    });
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      navigate(`/calendar/${day}/calendar`);
    }
  }, [fetcher.data, day]);
  return (
    <fetcher.Form method="post" className="w-full p-6">
      <FieldWrapper
        htmlFor="title"
        errorMessage={fieldErrors?.title || ''}
        labelName="Title"
      >
        <InputField
          autoComplete="off"
          placeholder="Title of the task"
          required
          defaultValue={draft.title}
          aria-label="title"
          name="title"
          id="title"
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="body"
        labelName="Body"
        errorMessage={fieldErrors?.body || ''}
      >
        <InputField
          autoComplete="off"
          placeholder="What do you want to do today?"
          required
          defaultValue={draft.body}
          aria-label="body"
          name="body"
          id="body"
        />
      </FieldWrapper>
      <button
        className="border-2 w-full mb-6 border-black dark:border-gray-500 outline-none rounded-md focus-within:border-2 dark:focus-within:border-highlight focus-within:border-highlight focus-within:text-highlight transition-colors"
        onClick={handleTaskDraftSubmit}
        type="button"
        name={CREATE_DRAFT}
        value={CREATE_DRAFT}
      >
        <FieldWrapper
          labelName="Date"
          htmlFor="date"
          className="mb-0 outline-none border-none"
          icon={<CalendarIcon />}
          errorMessage={fieldErrors?.date || ''}
        >
          <InputField
            autoComplete="off"
            aria-label="date"
            name="date"
            id="date"
            defaultValue={
              isMatch(selectedDate, 'yyyy-MM-dd') &&
              isValid(new Date(selectedDate))
                ? selectedDate
                : formatDate()
            }
          />
        </FieldWrapper>
      </button>
      <div className="flex justify-end">
        <Button
          className="rounded-full w-auto font-bold px-4 py-2 justify-center border-2 bg-highlight"
          primary
        >
          <span>Create task</span>
        </Button>
      </div>
    </fetcher.Form>
  );
}
