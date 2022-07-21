import { loader } from '~/rmx_loaders/editTask.server';

import { ActionFunction } from 'remix';

import { EditTask } from '~/components/Modals/EditTask';

export { loader };

export const action: ActionFunction = async () => {
  // do task update here
  return null;
};

export default function EditTaskRoute() {
  return <EditTask />;
}
