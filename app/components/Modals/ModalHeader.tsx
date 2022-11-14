import { Close, Title } from '@radix-ui/react-dialog';

import { ReactNode } from 'react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

type Props = {
  buttonValue?: string;
  children: ReactNode;
};

export function ModalHeader({ buttonValue, children }: Props) {
  return (
    <div className="w-full flex p-4 items-center">
      <Close asChild>
        <Button
          name={buttonValue ? '_action' : undefined}
          value={buttonValue}
          className="w-auto"
          aria-label={`close ${children} modal`}
        >
          <ArrowleftIcon />
        </Button>
      </Close>
      <div className="w-full text-center pr-5">
        <Title>{children}</Title>
      </div>
    </div>
  );
}
