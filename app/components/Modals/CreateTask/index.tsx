import * as Dialog from '@radix-ui/react-dialog';

import { useFetcher, useNavigate, useSearchParams } from '@remix-run/react';

import { DESTROY_DRAFT } from '../actionTypes';
import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';
import { FormComponent } from './FormComponent';

type CreateTaskProps = {
  draft: { title: string; body: string };
};

export function CreateTask({ draft }: CreateTaskProps) {
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const [searchParams] = useSearchParams();

  const handleOpenChange = () => {
    fetcher.submit({ _action: DESTROY_DRAFT }, { method: 'post' });

    if (searchParams.get('selectedDate')) {
      return navigate(-2);
    }

    return navigate(-1);
  };

  return (
    <Dialog.Root defaultOpen onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <Header srDescription="Create task dialog" shouldSubmitOnClose>
            {null}
          </Header>
          <FormComponent draft={draft} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
