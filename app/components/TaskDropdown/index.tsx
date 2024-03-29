import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useNavigate } from 'remix';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/Dropdown/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/Dropdown/DropdownTrigger';

import { useDeleteTask } from '~/utils/hooks/useDeleteTask';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { AlertDialog } from '../Dialogs/AlertDialog';
import { useAlertDialogWithElement } from '../Dialogs/AlertDialog/useAlertDialogWithElement';
import { DropdownContent } from '../Elements/Dropdown/DropdownContent';
import { EditIcon } from '../Icons/EditIcon';
import { EllipsisHorizontal } from '../Icons/EllipsisHorizontal';
import { TrashIcon } from '../Icons/TrashIcon';

type Props = {
  task: JsonifiedTask;
  isModal?: boolean;
};

export function TaskDropdown({ task, isModal }: Props) {
  const data = useRouteData<{ user: JsonifiedUser }>('root');

  const navigate = useNavigate();

  const { handleDeleteTask } = useDeleteTask({
    taskId: task.id,
    userId: task.userId,
  });

  const handleNavigation = () => {
    navigate(`${task.id}/edit`);
  };

  const { open, handleToggleElement, handleToggleAlert } =
    useAlertDialogWithElement();

  return (
    <>
      <DropdownMenu.Root
        open={open.element}
        modal={isModal}
        onOpenChange={handleToggleElement}
      >
        <DropdownTrigger asChild>
          <Button
            className="flex justify-center items-center max-w-[24px] h-[24px] w-full p-0 dark:text-primary border-transparent dark:border-transparent"
            aria-label="open task menu"
          >
            <EllipsisHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownContent loop sideOffset={10}>
          {data?.user?.id === task.userId ? (
            <>
              <DropdownItem onClick={handleToggleAlert} isFirstItem>
                <TrashIcon />
                <span>Delete task</span>
              </DropdownItem>
              <DropdownItem isLastItem onClick={handleNavigation}>
                <EditIcon />
                <span>Edit task</span>
              </DropdownItem>
            </>
          ) : null}
        </DropdownContent>
      </DropdownMenu.Root>
      <AlertDialog
        open={open.alert}
        onOpenChange={handleToggleAlert}
        onConfirm={handleDeleteTask}
        confirmButtonContent="Delete"
      >
        Are you sure you want to delete this task?
      </AlertDialog>
    </>
  );
}
