import { twMerge } from 'tailwind-merge';

import { useFetcher } from 'remix';

import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';
import { CheckmarkIcon } from '~/components/Icons/CheckmarkIcon';
import { TaskMenu } from '~/components/TaskMenu';

import { JsonifiedTask } from '~/types';

type Props = {
  task: JsonifiedTask;
};

export function Task({ task }: Props) {
  const fetcher = useFetcher();

  const isComplete = (): boolean => {
    const currentAction = fetcher.submission?.formData.get('_action');

    if (currentAction) {
      return currentAction === actionTypes.MARK_TASK_COMPLETE;
    }

    return task.isComplete;
  };

  return (
    <div
      className={twMerge(
        'bg-light-rgba dark:bg-dark-rgba max-w-sm rounded-2xl mb-4 p-4 border-2 border-shadowSecondary',
        isComplete() && 'bg-shadowPrimary dark:bg-shadowSecondary'
      )}
    >
      <div className="flex gap-4">
        <fetcher.Form method="post" className="max-w-[2rem]">
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
            className="flex justify-center items-center w-8 h-8 p-0"
          >
            {isComplete() ? <CheckmarkIcon /> : null}
          </Button>
        </fetcher.Form>
        <div className="max-w-sm w-full line-clamp-4">
          <span>{task.body}</span>
        </div>
        <TaskMenu task={task} />
      </div>
    </div>
  );
}
