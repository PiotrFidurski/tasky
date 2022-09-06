import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { useState } from 'react';

import {
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from '@remix-run/react';

import { CreateTaskProps } from '~/server/models/types';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { DESTROY_DRAFT } from '../actionTypes';
import { modalContent, modalOverlay } from '../classNames';
import { FormComponent } from './FormComponent';

type Props = {
  draft: Omit<CreateTaskProps, 'userId'>;
};

export function CreateTask({ draft }: Props) {
  const [open, setOpen] = useState({ create: true, warn: false });

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

  const handleWarningOpenChange = () => {
    setOpen((prev) => ({ ...prev, warn: !prev.warn }));
  };

  const handleOpenChange = () => {
    if (draft.body || draft.scheduledFor) {
      setOpen((prev) => ({ ...prev, warn: !prev.warn }));
    } else {
      setOpen((prev) => ({ ...prev, create: !prev.create }));
      navigate(-1);
    }
  };

  return (
    <>
      <Dialog.Root open={open.create} onOpenChange={handleOpenChange}>
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
      <Dialog.Root open={open.warn} onOpenChange={handleWarningOpenChange}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className={modalOverlay} />
          <Dialog.Content
            className={twMerge(
              modalContent,
              'justify-center lg:top-[40%] rounded-md md:top-[40%] top-[40%] text-center w-[350px] h-[220px]'
            )}
          >
            <p className="p-4">Are you sure u want to discard the changes?</p>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleWarningOpenChange}
                className="min-w-[140px]"
              >
                Go Back
              </Button>
              <Button
                onClick={handleDestroyDraft}
                className="min-w-[140px] border-rose-600 dark:border-rose-400 text-rose-600 dark:text-rose-400 hover:text-secondary dark:hover:text-primary"
              >
                Discard
              </Button>
            </div>
            <Dialog.Description className="sr-only">
              Task draft warning
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
