import * as Dialog from '@radix-ui/react-dialog';

import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
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

  const { open, toggleAlert } = useAlertWithElement({
    initialElementState: true,
  });

  const navigate = useNavigate();

  const { day } = useParams<'day'>();

  const fetcher = useFetcher();

  const [searchParams] = useSearchParams();

  const handleDestroyDraft = () => {
    fetcher.submit(
      { _action: DESTROY_DRAFT },
      { method: 'post', action: `/${day}/create` }
    );

    if (searchParams.get('date')) {
      return navigate(-2);
    }

    return navigate(-1);
  };

  const handleChange = () => {
    if (draft.body || draft.scheduledFor) {
      toggleAlert();
    } else {
      navigate(`/${day}`);
    }
  };

  return (
    <>
      <Dialog.Root open={open.element} onOpenChange={handleChange}>
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
        handleOpenChange={toggleAlert}
        handleConfirm={handleDestroyDraft}
      >
        Are you sure you want to discard the changes?
      </AlertModal>
    </>
  );
}
