import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@remix-run/react';

import { useUser } from '~/components/Auth/useUser';
import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';

import { JsonifiedTask } from '~/types';

import { DeleteTaskForm } from './DeleteTaskForm';

type TaskMenuDropdownProps = {
  task: JsonifiedTask;
};

export function TaskMenuDropdown({ task }: TaskMenuDropdownProps) {
  const user = useUser();

  return (
    <DropdownMenu.Root>
      <DropdownTrigger>
        <Button className="w-auto" aria-label="open task menu">
          <CaretDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu.Content
        loop
        className="rounded-lg min-w-[15rem] border bg-white dark:bg-black transition-colors"
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
