import * as Modal from '@radix-ui/react-dialog';

import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';
import { CreateTaskLoader } from '~/server/loaders/$day.create.server';

import { AlertDialog } from '../../Dialogs/AlertDialog';
import { useAlertDialogWithElement } from '../../Dialogs/AlertDialog/useAlertDialogWithElement';
import { ModalHeader } from '../ModalHeader';
import { contentClassnames, overlayClassnames } from '../classNames';
import { FormComponent } from './FormComponent';

export function CreateTaskModal() {
  const draft = useLoaderData<CreateTaskLoader>();

  const { open, handleToggleAlert } = useAlertDialogWithElement({
    initialElementState: true,
  });

  const navigate = useNavigate();

  const { day } = useParams<'day'>();

  const fetcher = useFetcher();

  const handleDestroyDraft = () => {
    fetcher.submit(
      { _action: actionTypes.DESTROY_DRAFT },
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
      <Modal.Root open={open.element} onOpenChange={handleOpenChange}>
        <Modal.Trigger />
        <Modal.Portal>
          <Modal.Overlay className={overlayClassnames} />
          <Modal.Content className={contentClassnames}>
            <fetcher.Form className="w-full flex p-4 items-center">
              <ModalHeader
                buttonName="_action"
                btnValue={actionTypes.DESTROY_DRAFT}
              >
                Create task
              </ModalHeader>
            </fetcher.Form>
            <FormComponent draft={draft} />
            <Modal.Description className="sr-only">
              Create task modal
            </Modal.Description>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
      <AlertDialog
        open={open.alert}
        handleOpenChange={handleToggleAlert}
        handleConfirm={handleDestroyDraft}
      >
        Are you sure you want to discard the changes?
      </AlertDialog>
    </>
  );
}
