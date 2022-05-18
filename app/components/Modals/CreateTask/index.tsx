import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { z } from 'zod';
import { ZodTaskErrors } from '~/validation/task';

import { Form, useActionData, useNavigate, useParams } from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { useErrors } from '~/utils/hooks/useErrors';

import { Header } from './Header';

type ActionData = z.infer<typeof ZodTaskErrors>;

export function CreateTask() {
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
        <Dialog.Content className="z-50 absolute inset-0 h-full bottom-auto dark:bg-slate-900 bg-light text-darkGray dark:text-lightGray max-w-full lg:max-w-lg m-auto">
          <Header />
          <div className="p-4 text-custom__gray">
            <Form method="post" className="p-4">
              <div className="w-full mb-2">
                <FieldWrapper
                  htmlFor="task"
                  errorMessage={fieldErrors?.body || ''}
                >
                  <InputField
                    placeholder="What do you want to do today?"
                    required
                    aria-label="body"
                    name="body"
                    id="task"
                  />
                </FieldWrapper>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
