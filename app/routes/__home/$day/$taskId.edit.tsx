import { action } from '~/server/actions/$day.taskId.edit.server';
import { loader } from '~/server/loaders/$day.taskId.edit.server';

import { EditTaskModal } from '~/components/Modals/EditTaskModal';

export { loader, action };

export default function EditTaskRoute() {
  return <EditTaskModal />;
}
