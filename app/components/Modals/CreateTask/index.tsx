import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { Form, useNavigate } from 'remix';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

type CreateTaskProps = {
  draft: { title: string; body: string };
};

export function CreateTask({ draft }: CreateTaskProps) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    // fetcher.submit({ reset: 'reset' }, { method: 'post' });
    // setOpen(false);
    // navigate(-1);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Form method="post">
          <Dialog.Content className={modalContent}>
            <Header srDescription="Create task dialog">Create task</Header>
            <FormComponent draft={draft} />
          </Dialog.Content>
        </Form>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
