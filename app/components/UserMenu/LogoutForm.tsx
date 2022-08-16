import { Form } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { LogoutIcon } from '~/components/Icons/LogoutIcon';

import { useProgrammaticSubmit } from '~/utils/hooks/useProgrammaticSubmit';

export function LogoutForm() {
  const { formRef, handleSubmit } = useProgrammaticSubmit();

  return (
    <DropdownItem onClick={handleSubmit} asChild>
      <Form action="/logout" method="post" className="w-full" ref={formRef}>
        <Button type="submit" className="px-2 py-4 font-bold">
          <LogoutIcon />
          <span>Logout</span>
        </Button>
      </Form>
    </DropdownItem>
  );
}
