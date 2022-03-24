import { Task } from '@prisma/client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from 'remix';

import { useUser } from '../Auth/useUser';
import { DropdownItem } from '../Elements/DropdownItem';
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
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="open task menu"
          type="button"
          className="p-1 text-custom__ghostly rounded-full hover:bg-custom__hoverlight dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray focus:dark:outline-custom__ghostly"
        >
          <CaretIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop
        className="rounded-lg min-w-[15rem] border bg-white dark:bg-custom__bluedark transition-colors dark:border-custom__gray"
      >
        <DropdownMenu.Arrow
          className="fill-custom__ghostly dark:fill-custom__gray"
          offset={20}
        />
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
