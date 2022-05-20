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
    <div className="py-4 text-custom__gray">
      <Form method="post" className="p-4">
        <div className="w-full mb-2">
          <Label htmlFor="task" errorMessage={fieldErrors?.body || ''}>
            <Input
              placeholder="What do you want to do today?"
              required
              aria-label="body"
              name="body"
              id="task"
            />
          </Label>
          <Label
            htmlFor="date"
            errorMessage={fieldErrors?.body || ''}
            hasIcon
            icon={<CalendarIcon />}
          >
            <Link to={`/calendar/${day}/calendar`}>
              <Input required aria-label="date" name="date" id="date" />
            </Link>
          </Label>
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded-full font-bold px-4 py-2 justify-center"
            primary
          >
            <span>Add Task</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
