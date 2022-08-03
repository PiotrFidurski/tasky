import { format } from 'date-fns';

import { Form, useActionData, useSearchParams } from '@remix-run/react';

import { action } from '~/server/actions/createTask.server';

import { Button } from '~/components/Elements/Buttonv2';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { TextArea } from '~/components/Form/TextArea';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { CaretUp } from '~/components/Icons/CaretUp';

import { DATE_FORMAT, isValidDateFormat } from '~/utils/date';
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
      <TextArea
        rows={4}
        errorMessage={fieldErrors?.body || ''}
        name="body"
        labelName="Body"
        defaultValue={draft.body ?? ''}
      />
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
