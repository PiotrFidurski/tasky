import { ActionFunction } from 'remix';

import { EditTask } from '~/components/Modals/EditTask';

import { loader } from '~/server/loaders/editTask.server';

export { loader };

export const action: ActionFunction = async () => {
  // do task update here
  return null;
};

export default function EditTaskRoute() {
  return <EditTask />;
}
