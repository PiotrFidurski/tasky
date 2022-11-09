import { forwardRef } from 'react';

import { MENU_ITEM_HEIGHT } from '../DeleteTaskButton/consts';
import { CustomLink } from '../Elements/CustomLink';
import { EditIcon } from '../Icons/EditIcon';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  taskId: string;
};

export const EditTaskLink = forwardRef<HTMLAnchorElement, Props>(
  ({ taskId }, ref) => {
    return (
      <CustomLink
        ref={ref}
        className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
        to={`${taskId}/edit`}
        aria-label="delete task"
        style={{ height: `${MENU_ITEM_HEIGHT}rem` }}
      >
        <EditIcon />
        <span>Edit Task</span>
      </CustomLink>
    );
  }
);

// export const EditTaskLink = forwardRef<HTMLAnchorElement, Props>(
//   ({ taskId }, ref) => {
//     return (
//       <CustomLink
//         ref={ref}
//         to={`${taskId}/edit`}
//         className="flex items-center px-2 py-4 gap-4 border-0 rounded-none w-full rounded-tl-md rounded-tr-md"
//         style={{ height: `${MENU_ITEM_HEIGHT}rem` }}
//       >
//         <EditIcon />
//         <span>Edit Task</span>
//       </CustomLink>
//     );
//   }
// );
