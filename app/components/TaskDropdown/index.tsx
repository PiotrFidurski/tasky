import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link, useFetcher } from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/Dropdown/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/Dropdown/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';

import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { DropdownContent } from '../Elements/Dropdown/DropdownContent';
import { AlertModal } from '../Modals/AlertModal';
import { useAlert } from '../Modals/AlertModal/useAlert';
import { DeleteTaskForm } from './DeleteTaskForm';

type Props = {
  task: JsonifiedTask;
};

export function TaskDropdown({ task }: Props) {
  const data = useRouteData<{ user: JsonifiedUser }>('root');

  const fetcher = useFetcher();

  const { open, toggleElement, toggleAlert } = useAlert();

  const handleDeleteTask = () => {
    fetcher.submit(
      { _action: actionTypes.DELETE_TASK, id: task.id, ownerId: task.userId },
      { method: 'post' }
    );
  };

  return (
    <>
      <DropdownMenu.Root
        open={open.element}
        modal={false}
        onOpenChange={toggleElement}
      >
        <DropdownTrigger asChild>
          <Button
            primary
            className="flex justify-center items-center p-0 max-w-[24px] h-[24px] w-full"
            aria-label="open task menu"
          >
            <CaretDown />
          </Button>
        </DropdownTrigger>
        <DropdownContent loop sideOffset={10}>
          {data?.user?.id === task.userId ? (
            <DeleteTaskForm
              handleWarningChange={toggleAlert}
              handleOpenChange={toggleElement}
              userId={data.user.id}
              taskId={task.id}
            />
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
      <AlertModal
        open={open.alert}
        onOpenChange={toggleAlert}
        onConfirm={handleDeleteTask}
        confirmBtnName="Delete"
      >
        Are you sure you want to delete this task?
      </AlertModal>
    </>
  );
}
