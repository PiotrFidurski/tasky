import { loader } from '~/server/loaders/taskId.edit.server';

import { EditTaskModal } from '~/components/Modals/EditTaskModal';

export { loader };

export default function EditTaskRoute() {
  return <EditTaskModal />;
}
