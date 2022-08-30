import { Form } from '@remix-run/react';

import { DropdownItem } from '~/components/Elements/DropdownItem';
import { LogoutIcon } from '~/components/Icons/LogoutIcon';

import { useActionTransition } from '~/utils/hooks/useActionTransition';

import { Button } from '../Elements/Button';
import { Spinner } from '../Spinner';

export function LogoutForm() {
  const { isSubmitting } = useActionTransition();

  return (
    <Form action="/logout" method="post" className="w-full">
      <DropdownItem asChild onSelect={(e) => e.preventDefault()}>
        <Button
          aria-label="logout"
          type="submit"
          className="border-0 rounded-none border-transparent dark:border-transparent w-full hover:bg-none"
        >
          <LogoutIcon />
          <span>Logout</span>
          {isSubmitting && <Spinner />}
        </Button>
      </DropdownItem>
    </Form>
  );
}
