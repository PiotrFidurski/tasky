import { Form } from '@remix-run/react';

import { DropdownItem } from '~/components/Elements/DropdownItem';
import { LogoutIcon } from '~/components/Icons/LogoutIcon';

import { useProgrammaticSubmit } from '~/utils/hooks/useProgrammaticSubmit';

export function LogoutForm() {
  const { formRef, handleSubmit } = useProgrammaticSubmit();

  return (
    <DropdownItem
      onClick={handleSubmit}
      asChild
      aria-label="logout"
      role="button"
    >
      <Form action="/logout" method="post" className="w-full" ref={formRef}>
        <LogoutIcon />
        <span>Logout</span>
      </Form>
    </DropdownItem>
  );
}
