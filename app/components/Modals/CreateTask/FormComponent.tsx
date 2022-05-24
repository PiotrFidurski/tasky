import { z } from 'zod';
import { ZodTaskErrors } from '~/validation/task';

import { Form, Link, useActionData, useParams } from 'remix';

import { Button } from '~/components/Elements/Button';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';

import { useErrors } from '~/utils/hooks/useErrors';

import { Input } from './Input';
import { Label } from './Label';

type ActionData = z.infer<typeof ZodTaskErrors>;

export function FormComponent() {
  const actionData = useActionData<ActionData>();

  const { day } = useParams<'day'>();

  const { fieldErrors } = useErrors(actionData);

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
              placeholder="task title"
              required
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
              placeholder="What do you want to do today?"
              required
              aria-label="body"
              name="body"
              id="body"
            />
          </Label>
          <Link
            to={`/calendar/${day}/calendar`}
            className="border-2 border-gray-500 outline-none rounded-md text-lightGray focus-within:border-highlight focus-within:text-highlight flex"
          >
            <Label
              labelName="Date"
              htmlFor="date"
              errorMessage=""
              hasIcon
              className="mb-0 outline-none border-none"
              icon={<CalendarIcon />}
            >
              <Input aria-label="date" name="date" id="date" />
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
