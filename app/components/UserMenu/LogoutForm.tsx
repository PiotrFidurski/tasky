import { Form } from '@remix-run/react';

import { DropdownItem } from '~/components/Elements/DropdownItem';
import { LogoutIcon } from '~/components/Icons/LogoutIcon';

import { Button } from '../Elements/Button';

export function LogoutForm() {
  return (
    <Form action="/logout" method="post" className="w-full">
      <DropdownItem
        asChild
        aria-label="logout"
        onSelect={(e) => e.preventDefault()}
      >
        <Button
          type="submit"
          className="border-0 rounded-none border-transparent dark:border-transparent w-full hover:bg-none"
        >
          <LogoutIcon />
          <span>Logout</span>
        </Button>
      </DropdownItem>
    </Form>
  );
}
