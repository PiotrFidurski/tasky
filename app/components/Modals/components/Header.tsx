import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

import { Form } from 'remix';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { DESTROY_DRAFT } from '../actionTypes';

type HeaderProps = {
  children: ReactNode;
  srDescription?: string;
  shouldSubmitOnClose?: boolean;
  onOpenChange?: () => void;
};

export function Header({
  children,
  srDescription = `${children} dialog`,
  shouldSubmitOnClose,
  onOpenChange,
}: HeaderProps) {
  return (
    <Form method="post" className="w-full flex p-2 max-w-full items-center">
      <Button
        type="submit"
        name={DESTROY_DRAFT}
        value={shouldSubmitOnClose ? DESTROY_DRAFT : undefined}
        className="w-auto"
        isIconWrapper
      >
        <Dialog.Close
          asChild
          onClick={(e) => {
            e.preventDefault();
            onOpenChange?.();
          }}
        >
          <ArrowleftIcon />
        </Dialog.Close>
      </Button>
      <div className="w-full text-center pr-[20px]">
        <Dialog.Title className="font-bold">{children}</Dialog.Title>
      </div>
      <Dialog.Description className="sr-only">
        {srDescription}
      </Dialog.Description>
    </Form>
  );
}
