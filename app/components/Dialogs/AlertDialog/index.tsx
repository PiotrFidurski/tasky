import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { ReactNode } from 'react';

import { Button } from '~/components/Elements/Button';

import { contentClassnames, overlayClassnames } from '../../Modals/classNames';

type Props = {
  open: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  confirmButtonContent?: string;
  children: ReactNode;
};

export function AlertDialog({
  open,
  onOpenChange,
  onConfirm,
  confirmButtonContent = 'Discard',
  children,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClassnames} />
        <Dialog.Content
          className={twMerge(
            contentClassnames,
            'justify-center lg:top-[40%] rounded-md md:top-[40%] top-[40%] text-center w-[350px] h-[220px]'
          )}
        >
          <p className="p-4">{children}</p>
          <div className="flex items-center gap-4">
            <Button
              onClick={onOpenChange}
              className="min-w-[140px]"
              aria-label="Go back"
            >
              Go Back
            </Button>
            <Button
              onClick={onConfirm}
              className="min-w-[140px] border-rose-600 dark:border-rose-400 text-rose-600 dark:text-rose-400 hover:text-secondary dark:hover:text-primary"
              aria-label={confirmButtonContent}
            >
              {confirmButtonContent}
            </Button>
          </div>
          <Dialog.Description className="sr-only">
            Alert dialog
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
