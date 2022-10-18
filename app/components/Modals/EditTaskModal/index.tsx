import * as Dialog from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { modalContent, modalOverlay } from '../classNames';
import { FormComponent } from './FormComponent';

export function EditTaskModal() {
  const navigate = useNavigate();

  const handleOpenChange = () => {
    navigate(-1);
  };

  return (
    <Dialog.Root defaultOpen onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <div className="w-full flex p-4 items-center">
            <Dialog.Close asChild>
              <Button aria-label="close dialog">
                <ArrowleftIcon />
              </Button>
            </Dialog.Close>
            <div className="w-full text-center pr-5">
              <Dialog.Title>Edit task</Dialog.Title>
            </div>
            <Dialog.Description className="sr-only">
              Edit task dialog
            </Dialog.Description>
          </div>
          <FormComponent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
