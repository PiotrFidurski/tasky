import { format } from 'date-fns';

import { Form, useActionData, useSearchParams } from '@remix-run/react';

import { action } from '~/server/actions/createTask.server';

import { Button } from '~/components/Elements/Buttonv2';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { TextArea } from '~/components/Form/TextArea';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { CaretDown } from '~/components/Icons/CaretDown';

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
      className="w-full p-12 flex flex-col justify-center items-center h-full"
    >
      <TextArea
        errorMessage={fieldErrors?.body || ''}
        name="body"
        labelName="Body"
      />
      <div className="flex w-full items-center gap-4 mb-20">
        <Button
          name="_action"
          value={CREATE_DRAFT}
          type="submit"
          className="flex gap-4 items-center px-6 text-sm text-darkgray border-textGray"
        >
          <CalendarIcon />
          <span>{selectedDate || 'Today'}</span>
          {/* <FieldWrapper
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
        </FieldWrapper> */}
        </Button>
        <Button className="flex justify-center items-center p-4 border-textGray text-darkgray">
          <label
            htmlFor="stuff"
            name="stuff"
            className="h-auto w-auto leading-[0]"
          >
            <InputField type="radio" name="stuff" className="w-5 h-5" />
          </label>
        </Button>
      </div>

      <div className="flex justify-end">
        <Button
          value={SUBMIT_FORM}
          name="_action"
          primary
          className="flex items-center gap-4 px-8 py-4 text-sm"
        >
          <span>New task</span>
          <CaretDown />
        </Button>
      </div>
    </Form>
  );
}
