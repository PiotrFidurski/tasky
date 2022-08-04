import { Form, useActionData, useSearchParams } from '@remix-run/react';

import { action } from '~/server/actions/createTask.server';

import { Button } from '~/components/Elements/Buttonv2';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { CaretUp } from '~/components/Icons/CaretUp';

import { useErrors } from '~/utils/hooks/useErrors';

import { CREATE_DRAFT, SUBMIT_FORM } from '../actionTypes';

type FormComponentProps = {
  draft: { title: string; body: string };
};

export function FormComponent({ draft }: FormComponentProps) {
  const actionData = useActionData<typeof action>();

  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get('selectedDate');

  const { fieldErrors } = useErrors(actionData);

  return (
    <Form
      method="post"
      className="w-full relative p-12 flex flex-col justify-center items-start h-full"
    >
      <textarea
        name="body"
        defaultValue={draft.body ?? ''}
        rows={4}
        placeholder="Enter new task"
        className="w-full bg-primary mb-6 text-md placeholder-textGray dark:bg-secondary resize-none text-secondary dark:text-primary caret-secondary dark:caret-primary outline-none"
      />
      <div className="h-4 flex items-center overflow-hidden mb-6 text-xs text-red-500 dark:text-rose-500">
        {fieldErrors?.body ? <span>{fieldErrors.body}</span> : null}
      </div>
      <Button
        name="_action"
        value={CREATE_DRAFT}
        type="submit"
        className="flex gap-4 mb-20 items-center px-6 text-sm text-textGrayDarker font-semibold border-grayLight"
      >
        <CalendarIcon />
        <span>{selectedDate || 'Today'}</span>
      </Button>
      <div className="flex justify-end">
        <Button
          value={SUBMIT_FORM}
          name="_action"
          primary
          className="flex absolute top-auto bottom-12 right-12 items-center gap-4 px-8 py-4 text-sm shadow-md shadow-shadowSecondary dark:shadow-shadowPrimary"
        >
          <span>New task</span>
          <CaretUp />
        </Button>
      </div>
    </Form>
  );
}
