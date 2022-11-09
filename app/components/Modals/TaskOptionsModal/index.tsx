import * as Modal from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { DeleteTaskButton } from '~/components/DeleteTaskButton';
import { AlertDialog } from '~/components/Dialogs/AlertDialog';
import { useAlertDialogWithElement } from '~/components/Dialogs/AlertDialog/useAlertDialogWithElement';
import { EditTaskLink } from '~/components/EditTaskLink';
import { Button } from '~/components/Elements/Button';
import { CaretDown } from '~/components/Icons/CaretDown';

import { useDeleteTask } from '~/utils/hooks/useDeleteTask';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { contentClassnames, overlayClassnames } from '../classNames';

type Props = {
  task: JsonifiedTask;
};

const MENU_ITEM_HEIGHT = 4; // rem
const PADDING_Y = 1; // rem

export function TaskOptionsModal({ task }: Props) {
  const data = useRouteData<{ isMobile: boolean; user: JsonifiedUser }>('root');

  const { open, handleToggleAlert, handleToggleElement } =
    useAlertDialogWithElement();

  const { handleDeleteTask } = useDeleteTask({
    taskId: task.id,
    userId: task.userId,
  });

  const handleOpenChange = () => {
    handleToggleElement();
  };

  return (
    <>
      <Modal.Root open={open.element} onOpenChange={handleOpenChange}>
        <Modal.Trigger asChild>
          <Button
            primary
            className="flex justify-center items-center p-0 max-w-[24px] h-[24px] w-full"
            aria-label="open task menu"
          >
            <CaretDown />
          </Button>
        </Modal.Trigger>
        <Modal.Portal>
          <Modal.Overlay className={overlayClassnames} />
          <Modal.Content
            className={twMerge(
              contentClassnames,
              'bottom-0 top-auto rounded-t-md'
            )}
            style={{
              maxHeight: `${MENU_ITEM_HEIGHT * 2 + PADDING_Y}rem`,
              paddingTop: `${PADDING_Y}rem`,
              paddingBottom: `${PADDING_Y}rem`,
            }}
          >
            {data?.user?.id === task.userId ? (
              <>
                <DeleteTaskButton onClick={handleToggleAlert} />
                <EditTaskLink taskId={task.id} />
              </>
            ) : null}

            <Modal.Description className="sr-only">
              Task options modal
            </Modal.Description>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
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
