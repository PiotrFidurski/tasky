import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { ReactNode } from 'react';

import { Button } from '~/components/Elements/Button';

import { modalContent, modalOverlay } from '../classNames';

type Props = {
  open: boolean;
  onChange: () => void;
  onCompleteAction: () => void;
  completeActionName?: string;
  children: ReactNode;
};

export function Warning({
  open,
  onCompleteAction,
  onChange,
  completeActionName = 'Discard',
  children,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content
          className={twMerge(
            modalContent,
            'justify-center lg:top-[40%] rounded-md md:top-[40%] top-[40%] text-center w-[350px] h-[220px]'
          )}
        >
          <p className="p-4">{children}</p>
          <div className="flex items-center gap-4">
            <Button onClick={onChange} className="min-w-[140px]">
              Go Back
            </Button>
            <Button
              onClick={onCompleteAction}
              className="min-w-[140px] border-rose-600 dark:border-rose-400 text-rose-600 dark:text-rose-400 hover:text-secondary dark:hover:text-primary"
            >
              {completeActionName}
            </Button>
          </div>
          <Dialog.Description className="sr-only">
            Task draft warning
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
