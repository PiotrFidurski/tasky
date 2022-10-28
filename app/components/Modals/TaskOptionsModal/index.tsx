import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';
import { TrashIcon } from '~/components/Icons/TrashIcon';

import { useDeleteTask } from '~/utils/hooks/useDeleteTask';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { AlertModal } from '../AlertModal';
import { useAlertWithElement } from '../AlertModal/useAlertWithElement';
import { modalContent, modalOverlay } from '../classNames';

type Props = {
  task: JsonifiedTask;
};

const MENU_ITEM_HEIGHT = 4; // rem
const PADDING_Y = 1; // rem

export function TaskOptionsModal({ task }: Props) {
  const data = useRouteData<{ isMobile: boolean; user: JsonifiedUser }>('root');

  const { open, handleToggleAlert, handleToggleElement } =
    useAlertWithElement();

  const { handleDeleteTask } = useDeleteTask({
    taskId: task.id,
    userId: task.userId,
  });

  const handleOpenChange = () => {
    handleToggleElement();
  };

  return (
    <>
      <Dialog.Root open={open.element} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <Button
            primary
            className="flex justify-center items-center p-0 max-w-[24px] h-[24px] w-full"
            aria-label="open task menu"
          >
            <CaretDown />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={modalOverlay} />
          <Dialog.Content
            className={twMerge(modalContent, 'bottom-0 top-auto rounded-t-md')}
            style={{
              maxHeight: `${MENU_ITEM_HEIGHT * 2 + PADDING_Y}rem`,
              paddingTop: `${PADDING_Y}rem`,
              paddingBottom: `${PADDING_Y}rem`,
            }}
          >
            {data?.user?.id === task.userId ? (
              <Button
                className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
                type="submit"
                onClick={handleToggleAlert}
                aria-label="delete task"
              >
                <TrashIcon />
                <span>Delete Task</span>
              </Button>
            ) : null}
            {data?.user?.id === task.userId ? (
              <CustomLink
                to={`${task.id}/edit`}
                className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
                style={{ height: `${MENU_ITEM_HEIGHT}rem` }}
              >
                <EditIcon />
                <span>Edit Task</span>
              </CustomLink>
            ) : null}
            <Dialog.Description className="sr-only">
              Task options dialog
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AlertModal
        open={open.alert}
        handleOpenChange={handleToggleAlert}
        handleConfirm={handleDeleteTask}
        confirmBtnName="Delete"
      >
        Are you sure you want to delete this task?
      </AlertModal>
    </>
  );
}
