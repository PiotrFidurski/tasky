import { format } from 'date-fns';

import { Form, useActionData, useSearchParams } from '@remix-run/react';

import { action } from '~/server/actions/createTask.server';
import { CreateTaskProps } from '~/server/models/types';

import { Button } from '~/components/Elements/Button';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { CaretUp } from '~/components/Icons/CaretUp';
import { Spinner } from '~/components/Spinner';

import { DATE_FORMAT } from '~/utils/date';
import { useActionTransition } from '~/utils/hooks/useActionTransition';
import { useErrors } from '~/utils/hooks/useErrors';

import { CREATE_DRAFT_BODY, SUBMIT_FORM } from '../actionTypes';

type Props = {
  draft: Omit<CreateTaskProps, 'userId'>;
};

export function FormComponent({ draft }: Props) {
  const actionData = useActionData<typeof action>();

  const { isSubmitting } = useActionTransition();

  const [searchParams] = useSearchParams({
    date: draft.scheduledFor ?? format(new Date(), DATE_FORMAT),
  });

  const date = searchParams.get('date');

  const { fieldErrors } = useErrors(actionData);

  return (
    <Form
      method="post"
      className="w-full px-12 mt-28 flex flex-col items-start h-full"
    >
      <label htmlFor="body" id="body" className="w-full">
        <textarea
          name="body"
          id="body"
          aria-label="body"
          defaultValue={draft.body ?? ''}
          rows={4}
          placeholder="Enter new task"
          className="w-full bg-primary dark:bg-secondary mb-6 placeholder-textGray resize-none text-secondary dark:text-primary caret-secondary dark:caret-primary outline-none"
        />
      </label>
      <div className="h-4 flex items-center mb-6 text-xs text-red-600 dark:text-rose-400">
        {fieldErrors?.body ? <span>{fieldErrors.body}</span> : null}
      </div>
      <Button
        name="_action"
        value={CREATE_DRAFT_BODY}
        type="submit"
        className="flex gap-2 items-center px-6 text-sm text-slate-500 dark:text-custom-indigo border-grayLight focus:border-slate-500 hover:border-slate-500"
      >
        <CalendarIcon />
        <span>{date || 'Today'}</span>
      </Button>
      <input
        value={
          draft.scheduledFor
            ? draft.scheduledFor
            : format(new Date(), DATE_FORMAT)
        }
        name="scheduledFor"
        type="hidden"
      />

      <div className="flex justify-end w-full">
        <Button
          value={SUBMIT_FORM}
          name="_action"
          primary
          type="submit"
          className="flex mt-28 items-center gap-4 px-8 py-4 text-sm shadow-md shadow-shadowSecondary dark:shadow-shadowPrimary"
        >
          <span>New task</span>
          {isSubmitting ? <Spinner /> : <CaretUp />}
        </Button>
      </div>
    </Form>
  );
}
