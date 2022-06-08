import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

import { useFetcher } from 'remix';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

type HeaderProps = {
  children: ReactNode;
  srDescription?: string;
};

export function Header({
  children,
  srDescription = `${children} dialog`,
}: HeaderProps) {
  const fetcher = useFetcher();

  return (
    <div className="w-full flex p-2 max-w-full items-center backdrop-blur-[10px] bg-slate-900/[.06]">
      <Dialog.Close asChild>
        <Button
          buttonType
          name="reset"
          value="reset"
          className="w-auto"
          isIconWrapper
          onClick={(e) => {
            fetcher.submit(e.currentTarget, { method: 'post' });
          }}
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
    </div>
  );
}
