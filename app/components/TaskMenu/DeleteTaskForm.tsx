import { actionTypes } from '~/rmx_actions/actionTypes';

import { Form } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';

import { useProgrammaticSubmit } from '~/utils/hooks/useProgrammaticSubmit';

type DeleteTaskFormProps = {
  taskId: string;
  userId: string;
};

export function DeleteTaskForm({ taskId, userId }: DeleteTaskFormProps) {
  const { formRef, handleSubmit } = useProgrammaticSubmit();

  return (
    <DropdownItem onClick={handleSubmit} asChild>
      <Form method="post" className="w-full" ref={formRef}>
        <Button
          type="submit"
          aria-label="delete task"
          className="px-2 py-4 font-semibold"
        >
          <input name="_action" value={actionTypes.DELETE_TASK} type="hidden" />
          <input name="id" value={taskId} type="hidden" />
          <input name="ownerId" value={userId} type="hidden" />
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
          <span>Delete Task</span>
        </Button>
      </Form>
    </DropdownItem>
  );
}
