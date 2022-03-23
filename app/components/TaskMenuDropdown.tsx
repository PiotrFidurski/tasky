import { Task } from '@prisma/client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from 'remix';

import { useUser } from './Auth/useUser';
import { DeleteTaskForm } from './DeleteTaskForm';
import { DropdownItem } from './Elements/DropdownItem';

type TaskMenuDropdownProps = {
  task: Task;
};

export function TaskMenuDropdown({ task }: TaskMenuDropdownProps) {
  const { user } = useUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="open task menu"
          type="button"
          className="p-1 text-custom__ghostly rounded-full hover:bg-custom__hoverlight dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray focus:dark:outline-custom__ghostly"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop
        className="rounded-lg min-w-[15rem] border bg-white dark:bg-custom__bluedark transition-colors dark:border-custom__gray"
      >
        <DropdownMenu.Arrow
          className="fill-custom__ghostly dark:fill-custom__gray"
          offset={20}
        />
        {user?.id === task.userId ? (
          <DeleteTaskForm userId={user.id} taskId={task.id} />
        ) : null}
        {user?.id === task.userId ? (
          <DropdownItem className="w-full" asChild>
            <Link
              to={`${task.id}/edit`}
              className="flex items-center gap-4 w-full px-2 py-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit Task</span>
            </Link>
          </DropdownItem>
        ) : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
