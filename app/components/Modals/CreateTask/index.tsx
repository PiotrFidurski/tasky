import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useNavigate, useParams } from 'remix';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

export function CreateTask() {
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
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <Header srDescription="Create task dialog">Create task</Header>
          <FormComponent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
