import { z } from 'zod';

import { format } from 'date-fns';

import { Form, useActionData, useParams } from '@remix-run/react';

import { CreateTaskAction } from '~/server/actions/$day.create.server';
import { actionTypes } from '~/server/actions/actionTypes';
import { CreateTaskProps } from '~/server/models/types';

import { Button } from '~/components/Elements/Button';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { CaretUp } from '~/components/Icons/CaretUp';
import { Spinner } from '~/components/Spinner';

import { DATE_FORMAT } from '~/utils/date';
import { useActionTransition } from '~/utils/hooks/useActionTransition';
import { useErrors } from '~/utils/hooks/useErrors';

type Props = {
  draft: Omit<CreateTaskProps, 'userId'>;
};

export function FormComponent({ draft }: Props) {
  const createTaskActionData = useActionData<CreateTaskAction>();

  const params = useParams<'day'>();

  const { isSubmitting, currentAction } = useActionTransition();

  const { fieldErrors } = useErrors(createTaskActionData);

  function getDateParam() {
    if (!draft.scheduledFor) {
      const dayParam = z.string().parse(params.day);

      return format(new Date(dayParam), DATE_FORMAT);
    }

    return draft.scheduledFor;
  }

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
        value={actionTypes.CREATE_DRAFT_BODY}
        type="submit"
        className="flex gap-2 items-center px-6 text-sm text-slate-500 dark:text-custom-indigo border-grayLight focus:border-slate-500 hover:border-slate-500"
      >
        <CalendarIcon />
        <span>{getDateParam()}</span>
      </Button>
      <input value={getDateParam()} name="scheduledFor" type="hidden" />
      <div className="flex justify-end w-full">
        <Button
          value={actionTypes.CREATE_TASK}
          name="_action"
          primary
          type="submit"
          className="flex mt-28 items-center gap-4 px-8 py-4 text-sm shadow-md shadow-shadowSecondary dark:shadow-shadowPrimary"
        >
          <span>New task</span>
          {isSubmitting && currentAction === actionTypes.CREATE_TASK ? (
            <Spinner />
          ) : (
            <CaretUp />
          )}
        </Button>
      </div>
    </Form>
  );
}
