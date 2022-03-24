import { Form } from 'remix';

import { LogoutIcon } from '../Icons/LogoutIcon';

export function LogoutForm() {
  return (
    <Form action="/logout" method="post" className="w-full">
      <button
        type="submit"
        className="w-full flex items-center gap-4 px-2 py-4 font-semibold"
      >
        <LogoutIcon />
        <span>Logout</span>
      </button>
    </Form>
  );
}
