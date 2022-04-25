import { Form } from 'remix';

import { useProgrammaticSubmit } from '~/utils/hooks/useProgrammaticSubmit';

import { Button } from '../Elements/Button';
import { DropdownItem } from '../Elements/DropdownItem';
import { LogoutIcon } from '../Icons/LogoutIcon';

export function LogoutForm() {
  const { formRef, handleSubmit } = useProgrammaticSubmit();

  return (
    <DropdownItem onClick={handleSubmit} asChild>
      <Form action="/logout" method="post" className="w-full" ref={formRef}>
        <Button type="submit" isMenuItem className="px-2 py-4 font-bold">
          <LogoutIcon />
          <span>Logout</span>
        </Button>
      </Form>
    </DropdownItem>
  );
}
