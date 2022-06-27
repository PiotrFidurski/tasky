import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';
import { ZodError, z } from 'zod';
import { getTask } from '~/models/task';

import {
  ActionFunction,
  Form,
  LoaderFunction,
  json,
  useLoaderData,
  useNavigate,
  useParams,
} from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

type LoaderData = {
  body: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const taskId = z
      .string({
        invalid_type_error: 'expected a string',
      })
      .parse(params.taskId);

    const task = await getTask(taskId);

    if (!task) {
      throw json("Couldn't find task with provided taskId.", { status: 404 });
    }

    const data: LoaderData = {
      body: task.body,
    };

    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      throw badRequest({ errors });
    }

    if (error instanceof Response) {
      throw error;
    }

    throw badRequest({ message: getErrorMessage(error) });
  }
};

export const action: ActionFunction = async () => {
  // do task update here
  return null;
};

export default function EditTaskRoute() {
  const { body } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const { day } = useParams<'day'>();

  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenChange = () => {
    setOpen(false);

    navigate(`/calendar/${day}`);
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 opacity-20 z-50" />
        <Dialog.Content className="z-50 absolute inset-0 top-12 bottom-auto bg-white max-w-full lg:max-w-lg m-auto rounded-md border dark:border-gray-600">
          <div className="flex p-2 max-w-full justify-between items-center border-b dark:border-gray-600">
            <Dialog.Title className="font-bold uppercase">
              Edit task
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Edit task dialog
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button
                buttonType
                primary
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
          <div className="p-4">
            <Form method="post">
              <FieldWrapper
                htmlFor="body"
                errorMessage=""
                labelName="Task body"
              >
                <InputField ref={inputRef} defaultValue={body} />
              </FieldWrapper>
              <div className="flex justify-end">
                <Button
                  primary
                  className="rounded-full px-2 py-1 max-w-[8rem] w-auto font-bold"
                >
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
