import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ZodError, z } from 'zod';
import { createTask } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';
import { ZodTaskErrros, schema } from '~/validation/task';

import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useNavigate,
  useParams,
} from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';
import { useErrors } from '~/utils/hooks/useErrors';

type ActionData = z.infer<typeof ZodTaskErrros>;

export const loader: LoaderFunction = async () => {
  return null;
};

export const action: ActionFunction = async ({ params, request }) => {
  try {
    const userId = await getAuthUserId(request);

    const form = await request.formData();

    const { body } = schema.parse(form);

    await createTask(body, userId);

    return redirect(`/calendar/${params.day}`);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    return getErrorMessage(error);
  }
};

export default function CreateTaskRoute() {
  const actionData = useActionData<ActionData>();

  const { fieldErrors } = useErrors(actionData);

  const navigate = useNavigate();

  const { day } = useParams<'day'>();

  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);

    navigate(`/calendar/${day}`);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-custom__gray dark:bg-custom__ghostly fixed inset-0 opacity-20 z-50" />
        <Dialog.Content className="z-50 absolute inset-0 top-12 bottom-auto bg-white dark:bg-custom__bluedark max-w-full lg:max-w-lg m-auto rounded-md border dark:border-gray-600 text-custom__gray dark:text-custom__ghostly">
          <div className="flex p-2 max-w-full justify-between items-center border-b dark:border-gray-600">
            <Dialog.Title className="font-bold uppercase">
              Create task
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Create task dialog
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button
                buttonType
                isGhost
                className="p-1 flex items-center justify-center w-auto rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </Dialog.Close>
          </div>
          <div className="p-4 text-custom__gray">
            <Form method="post" className="p-4 shadow-md" action=".">
              <div className="w-full mb-2">
                <FieldWrapper
                  htmlFor="task"
                  errorMessage={fieldErrors?.body || ''}
                >
                  <InputField
                    required
                    aria-label="body"
                    name="body"
                    id="task"
                  />
                </FieldWrapper>
              </div>
              <Button>Add task</Button>
            </Form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
