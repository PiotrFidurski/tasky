import * as Dialog from '@radix-ui/react-dialog';

import { ReactNode } from 'react';

import { Form, useParams } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { DESTROY_DRAFT } from '../actionTypes';

type HeaderProps = {
  children: ReactNode;
  srDescription?: string;
  shouldSubmitOnClose?: boolean;
};

export function Header({
  children,
  srDescription = `${children} dialog`,
  shouldSubmitOnClose,
}: HeaderProps) {
  const { day } = useParams<'day'>();

  return (
    <Form
      method="post"
      action={`/${day}/create`}
      className="w-full flex p-4 max-w-full items-center"
    >
      <Dialog.Close asChild>
        <Button
          type={shouldSubmitOnClose ? 'submit' : 'button'}
          name="_action"
          value={shouldSubmitOnClose ? DESTROY_DRAFT : undefined}
          className="w-auto"
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
