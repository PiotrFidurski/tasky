import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

export function Header() {
  return (
    <div className="flex p-2 max-w-full items-center backdrop-blur-[10px] bg-slate-900/[.06]">
      <Dialog.Close asChild>
        <Button buttonType className="w-auto" isIconWrapper>
          <ArrowleftIcon />
        </Button>
      </Dialog.Close>
      <div className="w-full text-center">
        <Dialog.Title className="font-bold">Create task</Dialog.Title>
      </div>
      <Dialog.Description className="sr-only">
        Create task dialog
      </Dialog.Description>
    </div>
  );
}
