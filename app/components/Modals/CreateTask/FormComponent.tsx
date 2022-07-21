import { format } from 'date-fns';

import { Form, useActionData, useSearchParams } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';

import { action } from '~/actions/createTask.server';

import { DATE_FORMAT, isValidDateFormat } from '~/utils/date';
import { useErrors } from '~/utils/hooks/useErrors';

import { CREATE_DRAFT, SUBMIT_FORM } from '../actionTypes';

type FormComponentProps = {
  draft: { title: string; body: string };
};

export function FormComponent({ draft }: FormComponentProps) {
  const actionData = useActionData<typeof action>();

  const [searchParams] = useSearchParams();

  const selectedDate =
    searchParams.get('selectedDate') ?? format(new Date(), DATE_FORMAT);

  const { fieldErrors } = useErrors(actionData);

  return (
    <Form method="post" className="w-full p-6">
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
        className="border-2 w-full mb-6 border-black dark:border-white outline-none rounded-md focus-within:border-2 dark:focus-within:border-highlight focus-within:border-highlight focus-within:text-highlight transition-colors"
        name="_action"
        value={CREATE_DRAFT}
        type="submit"
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
              isValidDateFormat(selectedDate)
                ? selectedDate
                : format(new Date(), DATE_FORMAT)
            }
          />
        </FieldWrapper>
      </button>
      <div className="flex justify-end">
        <Button value={SUBMIT_FORM} name="_action" primary>
          <span>Create task</span>
        </Button>
      </div>
    </Form>
  );
}
