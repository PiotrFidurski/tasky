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
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    fetcher.submit({ destroy_draft: 'destroy_draft' }, { method: 'post' });
    navigate(-2);
    setOpen(false);
  };

  return (
    <Form method="post">
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className={modalOverlay} />
          <Dialog.Content className={modalContent}>
            <Header srDescription="Create task dialog" shouldSubmitOnClose>
              Create task
            </Header>
            <FormComponent draft={draft} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Form>
  );
}
