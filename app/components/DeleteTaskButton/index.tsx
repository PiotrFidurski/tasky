import { forwardRef } from 'react';

import { Button } from '../Elements/Button';
import { TrashIcon } from '../Icons/TrashIcon';
import { MENU_ITEM_HEIGHT } from './consts';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

export const DeleteTaskButton = forwardRef<HTMLButtonElement, Props>(
  ({ onClick }, ref) => {
    return (
      <Button
        ref={ref}
        className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
        onClick={onClick}
        aria-label="delete task"
        style={{ height: `${MENU_ITEM_HEIGHT}rem` }}
      >
        <TrashIcon />
        <span>Delete Task</span>
      </Button>
    );
  }
);
