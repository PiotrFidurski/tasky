import { actionTypes } from '~/actions/actionTypes';

import { ArrowrightIcon } from '../Icons/ArrowrightIcon';
import { ComponentWithFetcherProps } from './types';

export function UnscheduleTaskForm({
  task,
  fetcher,
}: ComponentWithFetcherProps) {
  return (
    <fetcher.Form method="post">
      <input name="_action" value={actionTypes.UNSCHEDULE_TASK} type="hidden" />
      <input name="id" value={task.id} type="hidden" />
      <button
        type="submit"
        aria-label="unschedule task"
        className="text-custom__gray dark:text-custom__ghostly p-1 transform rotate-180"
      >
        <ArrowrightIcon />
      </button>
    </fetcher.Form>
  );
}
