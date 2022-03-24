import { Form } from 'remix';

import { DropdownItem } from '../Elements/DropdownItem';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { useProgramaticSubmit } from '../hooks/useProgramaticSubmit';

export function LogoutForm() {
  const { formRef, handleSubmit } = useProgramaticSubmit();

  return (
    <DropdownItem onClick={handleSubmit} asChild>
      <Form action="/logout" method="post" className="w-full" ref={formRef}>
        <button
          type="submit"
          className="w-full flex items-center gap-4 px-2 py-4 font-semibold"
        >
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </Form>
    </DropdownItem>
  );
}
