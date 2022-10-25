import * as Dialog from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { ModalHeader } from '../ModalHeader';
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
            <ModalHeader>Edit task</ModalHeader>

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
