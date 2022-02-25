import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';

import { Form } from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

export default function EditTaskRoute() {
  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen(false);
        // navigate back
      }}
    >
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-custom__gray dark:bg-custom__ghostly absolute inset-0 opacity-20" />
        <Dialog.Content className="absolute inset-0 top-12 bottom-auto bg-white dark:bg-custom__bluedark max-w-full lg:max-w-lg m-auto rounded-md border dark:border-gray-600 text-custom__gray dark:text-custom__ghostly">
          <div className="flex p-2 max-w-full justify-between items-center border-b border-custom__gray dark:border-gray-600">
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
          <div className="p-4">
            <Form>
              <FieldWrapper htmlFor="body" errorMessage="">
                <InputField ref={inputRef} />
              </FieldWrapper>
            </Form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
