import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/Dropdown/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/Dropdown/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';

import { useDeleteTask } from '~/utils/hooks/useDeleteTask';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { DeleteTaskButton } from '../DeleteTaskButton';
import { AlertDialog } from '../Dialogs/AlertDialog';
import { useAlertDialogWithElement } from '../Dialogs/AlertDialog/useAlertDialogWithElement';
import { EditTaskLink } from '../EditTaskLink';
import { DropdownContent } from '../Elements/Dropdown/DropdownContent';

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
            <>
              <DropdownItem asChild isFirstItem>
                <DeleteTaskButton onClick={handleToggleAlert} />
              </DropdownItem>
              <DropdownItem asChild isFirstItem>
                <DeleteTaskButton onClick={handleToggleAlert} />
              </DropdownItem>
              <DropdownItem asChild isFirstItem>
                <DeleteTaskButton onClick={handleToggleAlert} />
              </DropdownItem>
              <DropdownItem asChild isLastItem>
                <EditTaskLink taskId={task.id} />
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
