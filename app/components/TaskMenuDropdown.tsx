import { Task } from '@prisma/client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { actionTypes } from '~/actions/actionTypes';

import { Link, useFetcher } from 'remix';

import { useUser } from './Auth/useUser';
import { Button } from './Elements/Button';

type TaskMenuDropdownProps = {
  task: Task;
};

export function TaskMenuDropdown({ task }: TaskMenuDropdownProps) {
  const { user } = useUser();

  const fetcher = useFetcher();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="open task menu"
          type="button"
          className="p-1 rounded-full hover:bg-custom__hoverlight dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray focus:dark:outline-custom__ghostly"
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
          <div className="p-1 flex gap-4 items-center">
            <fetcher.Form method="post">
              <input
                name="_action"
                value={actionTypes.DELETE_TASK}
                type="hidden"
              />
              <input name="id" value={task.id} type="hidden" />
              <input name="ownerId" value={task.userId} type="hidden" />
              <Button
                type="submit"
                isGhost
                className="text-rose-600 border-rose-600 rounded-full p-1 hover:bg-rose-600 hover:border-rose-600"
                aria-label="delete task"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </Button>
            </fetcher.Form>
            <Link to={`${task.id}/edit`}>
              <Button
                type="submit"
                isGhost
                className="text-green-600 border-green-600 rounded-full p-1 hover:bg-green-600 hover:border-green-600"
                aria-label="update task"
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
              </Button>
            </Link>
          </div>
        ) : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
