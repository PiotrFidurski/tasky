import React, { useState } from 'react';
import { z } from 'zod';
import { ZodTaskErrors } from '~/validation/task';

import { Form, Link, useActionData, useParams, useSearchParams } from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';

import { formatDate } from '~/utils/date';
import { useErrors } from '~/utils/hooks/useErrors';

import { Input } from './Input';

type ActionData = z.infer<typeof ZodTaskErrors>;

export function FormComponent() {
  const actionData = useActionData<ActionData>();

  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState(searchParams.get('title') ?? '');

  const [body, setBody] = useState(searchParams.get('body') ?? '');

  const { day } = useParams<'day'>();

  const { fieldErrors } = useErrors(actionData);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  return (
    <div className="py-4">
      <Form method="post" className="p-4">
        <div className="w-full mb-2">
          <FieldWrapper
            htmlFor="title"
            errorMessage={fieldErrors?.title || ''}
            labelName="Title"
          >
            <Input
              onChange={handleTitleChange}
              placeholder="task title"
              required
              value={title}
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
            <Input
              onChange={handleBodyChange}
              placeholder="What do you want to do today?"
              required
              value={body}
              aria-label="body"
              name="body"
              id="body"
            />
          </FieldWrapper>
          <Link
            to={`/calendar/${day}/calendar?title=${title}&body=${body}&selectedDate=${
              searchParams.get('selectedDate') ?? formatDate()
            }`}
            className="flex border-2 border-gray-500 outline-none rounded-md text-lightGray focus-within:border-2 focus-within:border-highlight focus:text-highlight transition-colors"
          >
            <FieldWrapper
              labelName="Date"
              htmlFor="date"
              errorMessage=""
              hasIcon
              className="mb-0 outline-none border-none"
              icon={<CalendarIcon />}
            >
              <Input
                disabled
                aria-label="date"
                name="date"
                id="date"
                defaultValue={searchParams.get('selectedDate') ?? formatDate()}
              />
            </FieldWrapper>
          </Link>
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded-full font-bold px-4 py-2 justify-center border-2 bg-highlight dark:text-black"
            primary
          >
            <span>Create task</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
