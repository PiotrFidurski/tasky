import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';

import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { DropdownContent } from '../Elements/DropdownContent';
import { DeleteTaskForm } from './DeleteTaskForm';

type Props = {
  task: JsonifiedTask;
};

export function TaskMenu({ task }: Props) {
  const data = useRouteData<{ user: JsonifiedUser }>('root');

  return (
    <DropdownMenu.Root>
      <DropdownTrigger>
        <Button
          primary
          className="flex justify-center items-center p-0 max-w-[24px] h-[24px] w-full"
          aria-label="open task menu"
        >
          <CaretDown />
        </Button>
      </DropdownTrigger>
      <DropdownContent loop>
        {data?.user?.id === task.userId ? (
          <DeleteTaskForm userId={data.user.id} taskId={task.id} />
        ) : null}
        {data?.user?.id === task.userId ? (
          <DropdownItem asChild isLastItem>
            <Link
              to={`${task.id}/edit`}
              className="flex items-center gap-4 w-full px-2 py-4"
            >
              <EditIcon />
              <span>Edit Task</span>
            </Link>
          </DropdownItem>
        ) : null}
      </DropdownContent>
    </DropdownMenu.Root>
  );
}
