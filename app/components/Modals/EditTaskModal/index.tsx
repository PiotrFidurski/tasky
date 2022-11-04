import * as Modal from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { ModalHeader } from '../ModalHeader';
import { contentClassnames, overlayClassnames } from '../classNames';
import { FormComponent } from './FormComponent';

export function EditTaskModal() {
  const navigate = useNavigate();

  const handleOpenChange = () => {
    navigate(-1);
  };

  return (
    <Modal.Root defaultOpen onOpenChange={handleOpenChange}>
      <Modal.Trigger />
      <Modal.Portal>
        <Modal.Overlay className={overlayClassnames} />
        <Modal.Content className={contentClassnames}>
          <div className="w-full flex p-4 items-center">
            <ModalHeader>Edit task</ModalHeader>
          </div>
          <FormComponent />
          <Modal.Description className="sr-only">
            Edit task modal
          </Modal.Description>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}
