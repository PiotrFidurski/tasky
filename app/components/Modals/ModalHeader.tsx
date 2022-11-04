import { Close, Title } from '@radix-ui/react-dialog';

import { ReactNode } from 'react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

type Props = {
  buttonName?: string;
  btnValue?: string;
  children: ReactNode;
};

export function ModalHeader({ buttonName, btnValue, children }: Props) {
  return (
    <>
      <Close asChild>
        <Button
          name={buttonName}
          value={btnValue}
          className="w-auto"
          aria-label={`close ${children} modal`}
        >
          <ArrowleftIcon />
        </Button>
      </Close>
      <div className="w-full text-center pr-5">
        <Title>{children}</Title>
      </div>
    </>
  );
}
