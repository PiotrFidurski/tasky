import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from '@remix-run/react';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

export function EditTask() {
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
          <Header srDescription="Create task dialog" shouldSubmitOnClose>
            Edit task
          </Header>
          <FormComponent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
