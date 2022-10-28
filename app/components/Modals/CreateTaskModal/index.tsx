import * as Dialog from '@radix-ui/react-dialog';

import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';

import { loader } from '~/server/loaders/$day.create.server';

import { AlertModal } from '../AlertModal';
import { useAlertWithElement } from '../AlertModal/useAlertWithElement';
import { ModalHeader } from '../ModalHeader';
import { DESTROY_DRAFT } from '../actionTypes';
import { modalContent, modalOverlay } from '../classNames';
import { FormComponent } from './FormComponent';

export function CreateTaskModal() {
  const draft = useLoaderData<typeof loader>();

  const { open, handleToggleAlert } = useAlertWithElement({
    initialElementState: true,
  });

  const navigate = useNavigate();

  const { day } = useParams<'day'>();

  const fetcher = useFetcher();

  const handleDestroyDraft = () => {
    fetcher.submit(
      { _action: DESTROY_DRAFT },
      { method: 'post', action: `/${day}/create` }
    );
  };

  const handleOpenChange = () => {
    if (draft.body || draft.scheduledFor) {
      handleToggleAlert();
    } else {
      navigate(`/${day}`);
    }
  };

  return (
    <>
      <Dialog.Root open={open.element} onOpenChange={handleOpenChange}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className={modalOverlay} />
          <Dialog.Content className={modalContent}>
            <fetcher.Form className="w-full flex p-4 items-center">
              <ModalHeader buttonName="_action" btnValue={DESTROY_DRAFT}>
                Create task
              </ModalHeader>
            </fetcher.Form>
            <FormComponent draft={draft} />
            <Dialog.Description className="sr-only">
              Create task dialog
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AlertModal
        open={open.alert}
        handleOpenChange={handleToggleAlert}
        handleConfirm={handleDestroyDraft}
      >
        Are you sure you want to discard the changes?
      </AlertModal>
    </>
  );
}
