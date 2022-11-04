import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/Dropdown/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/Dropdown/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';

import { useDeleteTask } from '~/utils/hooks/useDeleteTask';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { AlertDialog } from '../Dialogs/AlertDialog';
import { useAlertDialogWithElement } from '../Dialogs/AlertDialog/useAlertDialogWithElement';
import { DropdownContent } from '../Elements/Dropdown/DropdownContent';
import { TrashIcon } from '../Icons/TrashIcon';

type Props = {
  task: JsonifiedTask;
};

export function TaskDropdown({ task }: Props) {
  const data = useRouteData<{ user: JsonifiedUser }>('root');

  const { handleDeleteTask } = useDeleteTask({
    taskId: task.id,
    userId: task.userId,
  });

  const { open, handleToggleElement, handleToggleAlert } =
    useAlertDialogWithElement();

  return (
    <>
      <DropdownMenu.Root
        open={open.element}
        modal={false}
        onOpenChange={handleToggleElement}
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
            <DropdownItem asChild isFirstItem>
              <Button
                className="border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
                type="submit"
                onClick={handleToggleAlert}
                aria-label="delete task"
              >
                <TrashIcon />
                <span>Delete Task</span>
              </Button>
            </DropdownItem>
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
      <AlertDialog
        open={open.alert}
        handleOpenChange={handleToggleAlert}
        handleConfirm={handleDeleteTask}
        confirmButtonContent="Delete"
      >
        Are you sure you want to delete this task?
      </AlertDialog>
    </>
  );
}
