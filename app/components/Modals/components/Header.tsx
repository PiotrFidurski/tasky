import * as Dialog from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';

import { Form, useFetcher } from 'remix';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

type HeaderProps = {
  children: ReactNode;
  srDescription?: string;
  destroyDraftOnClose?: boolean;
};

export function Header({
  children,
  srDescription = `${children} dialog`,
  destroyDraftOnClose,
}: HeaderProps) {
  const fetcher = useFetcher();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (destroyDraftOnClose) {
      fetcher.submit(e.currentTarget, { method: 'post' });
    }
  };

  return (
    <Form
      method="post"
      className="w-full flex p-2 max-w-full items-center backdrop-blur-[10px] bg-slate-900/[.06]"
    >
      <Dialog.Close asChild>
        <Button
          buttonType
          name="destroy_draft"
          value="destroy_draft"
          className="w-auto"
          isIconWrapper
          onClick={handleClick}
        >
          <ArrowleftIcon />
        </Button>
      </Dialog.Close>
      <div className="w-full text-center pr-[20px]">
        <Dialog.Title className="font-bold">{children}</Dialog.Title>
      </div>
      <Dialog.Description className="sr-only">
        {srDescription}
      </Dialog.Description>
    </Form>
  );
}
