import { actionTypes } from '~/actions/actionTypes';

import { ArrowrightIcon } from '../Icons/ArrowrightIcon';
import { ComponentWithFetcherProps } from './types';

export function UnscheduleTaskForm({
  task,
  fetcher,
}: ComponentWithFetcherProps<unknown>) {
  return (
    <fetcher.Form method="post">
      <input name="_action" value={actionTypes.UNSCHEDULE_TASK} type="hidden" />
      <input name="id" value={task.id} type="hidden" />
      <button
        type="submit"
        aria-label="unschedule task"
        className="text-custom__gray dark:text-custom__ghostly p-1 transform rotate-180 rounded-full hover:bg-custom__hoverlight
        dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight 
          focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray
        focus:dark:outline-custom__ghostly"
      >
        <ArrowrightIcon />
      </button>
    </fetcher.Form>
  );
}
