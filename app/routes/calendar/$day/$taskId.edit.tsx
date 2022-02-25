import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { getTask } from '~/models/task';

import {
  ActionFunction,
  Form,
  LoaderFunction,
  useLoaderData,
  useNavigate,
  useParams,
} from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { badRequest } from '~/utils/badRequest';

type LoaderData = {
  body: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const taskId = z
      .string({ required_error: 'expected a string' })
      .parse(params.taskId);

    const task = await getTask(taskId);

    if (!task) {
      throw badRequest("Couldn't find task with provided taskId");
    }

    const data: LoaderData = {
      body: task.body,
    };

    return data;
  } catch (error) {
    return error;
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
        <Dialog.Overlay className="bg-custom__gray dark:bg-custom__ghostly fixed inset-0 opacity-20 z-50" />
        <Dialog.Content className="z-50 absolute inset-0 top-12 bottom-auto bg-white dark:bg-custom__bluedark max-w-full lg:max-w-lg m-auto rounded-md border dark:border-gray-600 text-custom__gray dark:text-custom__ghostly">
          <div className="flex p-2 max-w-full justify-between items-center border-b dark:border-gray-600">
            <Dialog.Title className="font-bold uppercase">
              Edit task
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Edit task dialog
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button
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
            <Form method="post">
              <FieldWrapper htmlFor="body" errorMessage="">
                <InputField ref={inputRef} defaultValue={body} />
              </FieldWrapper>
              <div className="flex justify-end">
                <Button isGhost className="rounded-full p-1 max-w-[8rem]">
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
