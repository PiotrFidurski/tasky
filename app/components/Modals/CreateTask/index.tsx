import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { Form, useFetcher, useNavigate } from 'remix';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

type CreateTaskProps = {
  draft: { title: string; body: string };
};

export function CreateTask({ draft }: CreateTaskProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    fetcher.submit({ reset: 'reset' }, { method: 'post' });

    setOpen(false);

    navigate(-1);
  };

  return (
    <Form method="post">
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Form method="post">
            <Dialog.Overlay className={modalOverlay} />
            <Dialog.Content className={modalContent}>
              <Header srDescription="Create task dialog">Create task</Header>
              <FormComponent draft={draft} />
            </Dialog.Content>
          </Form>
        </Dialog.Portal>
      </Dialog.Root>
    </Form>
  );
}
