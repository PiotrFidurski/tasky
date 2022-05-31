import React, { useState } from 'react';
import { z } from 'zod';
import { ZodTaskErrors } from '~/validation/task';

import { Form, Link, useActionData, useParams, useSearchParams } from 'remix';

import { Button } from '~/components/Elements/Button';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';

import { formatDate } from '~/utils/date';
import { useErrors } from '~/utils/hooks/useErrors';

import { Input } from './Input';
import { Label } from './Label';

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
          <Label
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
          </Label>
          <Label
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
          </Label>
          <Link
            to={`/calendar/${day}/calendar?title=${title}&body=${body}`}
            className="flex border-2 border-slate-900 dark:border-gray-500 outline-none rounded-md text-lightGray focus:border-highlight focus:text-highlight transition-colors"
          >
            <Label
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
            </Label>
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
