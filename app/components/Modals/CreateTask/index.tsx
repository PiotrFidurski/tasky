import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useNavigate, useParams } from 'remix';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

type CreateTaskProps = {
  draft: { title: string; body: string };
};

export function CreateTask({ draft }: CreateTaskProps) {
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
          <FormComponent draft={draft} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
