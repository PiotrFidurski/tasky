import * as Dialog from '@radix-ui/react-dialog';

import {
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from '@remix-run/react';

import { CreateTaskProps } from '~/server/models/types';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { AlertModal } from '../AlertModal';
import { useAlert } from '../AlertModal/useAlert';
import { DESTROY_DRAFT } from '../actionTypes';
import { modalContent, modalOverlay } from '../classNames';
import { FormComponent } from './FormComponent';

type Props = {
  draft: Omit<CreateTaskProps, 'userId'>;
};

export function CreateTaskModal({ draft }: Props) {
  const { open, toggleAlert, setOpen } = useAlert({
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
      setOpen((prev) => ({ ...prev, element: false }));
      navigate(-1);
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
              <Dialog.Close asChild>
                <Button name="_action" value={DESTROY_DRAFT}>
                  <ArrowleftIcon />
                </Button>
              </Dialog.Close>
              <div className="w-full text-center pr-5">
                <Dialog.Title>Create task</Dialog.Title>
              </div>
              <Dialog.Description className="sr-only">
                Create task dialog
              </Dialog.Description>
            </fetcher.Form>
            <FormComponent draft={draft} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AlertModal
        open={open.alert}
        onChange={toggleAlert}
        onCompleteAction={handleDestroyDraft}
      >
        Are you sure you want to discard the changes?
      </AlertModal>
    </>
  );
}
