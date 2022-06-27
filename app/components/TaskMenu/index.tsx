import { Task } from '@prisma/client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from 'remix';

import { useUser } from '../Auth/useUser';
import { Button } from '../Elements/Button';
import { DropdownItem } from '../Elements/DropdownItem';
import { DropdownTrigger } from '../Elements/DropdownTrigger';
import { CaretIcon } from '../Icons/CaretIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteTaskForm } from './DeleteTaskForm';

type TaskMenuDropdownProps = {
  task: Task;
};

export function TaskMenuDropdown({ task }: TaskMenuDropdownProps) {
  const { user } = useUser();

  return (
    <DropdownMenu.Root>
      <DropdownTrigger>
        <Button className="w-auto" aria-label="open task menu" type="button">
          <CaretIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu.Content
        loop
        className="rounded-lg min-w-[15rem] border bg-white transition-colors"
      >
        <DropdownMenu.Arrow className="fill-white" offset={20} />
        {user?.id === task.userId ? (
          <DeleteTaskForm userId={user.id} taskId={task.id} />
        ) : null}
        {user?.id === task.userId ? (
          <DropdownItem className="w-full" asChild>
            <Link
              to={`${task.id}/edit`}
              className="flex items-center gap-4 w-full px-2 py-4"
            >
              <EditIcon />
              <span>Edit Task</span>
            </Link>
          </DropdownItem>
        ) : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
