import { Form } from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';

import { TrashIcon } from '../Icons/TrashIcon';

type Props = {
  taskId: string;
  userId: string;
};

export function DeleteTaskForm({ taskId, userId }: Props) {
  return (
    <Form method="post" className="w-full">
      <DropdownItem
        asChild
        className="rounded-tl-md rounded-tr-md px-2 py-4"
        onSelect={(e) => e.preventDefault()}
      >
        <Button
          type="submit"
          aria-label="delete task"
          className="border-0 rounded-none border-transparent dark:border-transparent w-full hover:bg-none"
        >
          <input name="_action" value={actionTypes.DELETE_TASK} type="hidden" />
          <input name="id" value={taskId} type="hidden" />
          <input name="ownerId" value={userId} type="hidden" />
          <TrashIcon />
          <span>Delete Task</span>
        </Button>
      </DropdownItem>
    </Form>
  );
}
