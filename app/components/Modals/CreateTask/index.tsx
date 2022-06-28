import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

type CreateTaskProps = {
  draft: { title: string; body: string };
};

export function CreateTask({ draft }: CreateTaskProps) {
  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <Header
            srDescription="Create task dialog"
            shouldSubmitOnClose
            onOpenChange={handleOpenChange}
          >
            Create task
          </Header>
          <FormComponent draft={draft} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
