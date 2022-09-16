import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';

import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { DeleteTaskForm } from './DeleteTaskForm';

type TaskMenuDropdownProps = {
  task: JsonifiedTask;
};

export function TaskMenuDropdown({ task }: TaskMenuDropdownProps) {
  const data = useRouteData<{ user: JsonifiedUser }>('root');

  return (
    <DropdownMenu.Root>
      <DropdownTrigger>
        <Button className="w-auto" aria-label="open task menu">
          <CaretDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu.Content
        loop
        sideOffset={10}
        className="rounded-lg min-w-[14rem] dark:bg-secondary bg-primary shadow-custom-light dark:shadow-custom-dark"
      >
        {data?.user?.id === task.userId ? (
          <DeleteTaskForm userId={data.user.id} taskId={task.id} />
        ) : null}
        {data?.user?.id === task.userId ? (
          <DropdownItem
            className="rounded-tl-md rounded-tr-md px-2 py-4"
            asChild
          >
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
