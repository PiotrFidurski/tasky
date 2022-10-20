import { action } from '~/server/actions/$day.create.server';
import { loader } from '~/server/loaders/$day.create.server';

import { CreateTaskModal } from '~/components/Modals/CreateTaskModal';

export { loader };
export { action };

export default function CreateTaskRoute() {
  return <CreateTaskModal />;
}
