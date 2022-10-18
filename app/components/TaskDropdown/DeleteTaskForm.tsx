import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/Dropdown/DropdownItem';

import { TrashIcon } from '../Icons/TrashIcon';

type Props = {
  taskId: string;
  userId: string;
  handleOpenChange: () => void;
  handleWarningChange: () => void;
};

export function DeleteTaskForm({
  taskId,
  userId,
  handleOpenChange,
  handleWarningChange,
}: Props) {
  const handleChange = () => {
    handleWarningChange();
    handleOpenChange();
  };

  return (
    <DropdownItem asChild isFirstItem>
      <Button
        type="submit"
        onClick={handleChange}
        aria-label="delete task"
        className="border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
      >
        <input name="_action" value={actionTypes.DELETE_TASK} type="hidden" />
        <input name="id" value={taskId} type="hidden" />
        <input name="ownerId" value={userId} type="hidden" />
        <TrashIcon />
        <span>Delete Task</span>
      </Button>
    </DropdownItem>
  );
}
