import { Button } from '~/components/Elements/Button';
import { CheckmarkIcon } from '~/components/Icons/CheckmarkIcon';

import { actionTypes } from '~/server/actions/actionTypes';

import { ComponentWithFetcherProps } from './types';

export function CompleteTaskForm({
  task,
  fetcher,
  isComplete,
}: ComponentWithFetcherProps<unknown> & { isComplete: () => boolean }) {
  return (
    <div className="flex items-start gap-2 p-2 bg-transparent">
      <fetcher.Form method="post">
        <input
          name="_action"
          value={
            isComplete()
              ? actionTypes.MARK_TASK_INCOMPLETE
              : actionTypes.MARK_TASK_COMPLETE
          }
          type="hidden"
        />
        <input name="id" value={task.id} type="hidden" />
        <Button
          type="submit"
          aria-label={isComplete() ? 'uncomplete task' : 'complete task'}
          className="rounded-full border-2"
        >
          {isComplete() ? <CheckmarkIcon /> : <div className="h-6 w-6" />}
        </Button>
      </fetcher.Form>
      <p className="font-semibold">{task.body}</p>
    </div>
  );
}
