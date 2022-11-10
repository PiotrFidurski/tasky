import * as Modal from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { AlertDialog } from '~/components/Dialogs/AlertDialog';
import { useAlertDialogWithElement } from '~/components/Dialogs/AlertDialog/useAlertDialogWithElement';
import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';
import { TrashIcon } from '~/components/Icons/TrashIcon';

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
                <Button
                  className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
                  onClick={handleToggleAlert}
                  aria-label="delete task"
                  style={{ height: `${MENU_ITEM_HEIGHT}rem` }}
                >
                  <TrashIcon />
                  <span>Delete Task</span>
                </Button>
                <CustomLink
                  className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
                  to={`${task.id}/edit`}
                  aria-label="delete task"
                  style={{ height: `${MENU_ITEM_HEIGHT}rem` }}
                >
                  <EditIcon />
                  <span>Edit Task</span>
                </CustomLink>
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
