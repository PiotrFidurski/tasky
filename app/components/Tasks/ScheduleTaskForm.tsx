import { actionTypes } from '~/actions/actionTypes';

import { useParams } from 'remix';

import { formatDate } from '~/utils/date';

import { ArrowleftIcon } from '../Icons/ArrowleftIcon';
import { ComponentWithFetcherProps } from './types';

export function ScheduleTaskForm({
  task,
  fetcher,
}: ComponentWithFetcherProps<unknown>) {
  const { day } = useParams<'day'>();

  return (
    <fetcher.Form method="post">
      <input name="_action" value={actionTypes.SCHEDULE_TASK} type="hidden" />
      <input name="date" value={!day ? formatDate() : day} type="hidden" />
      <input name="id" value={task.id} type="hidden" />
      <button
        type="submit"
        aria-label="schedule task"
        className="p-1 text-custom__gray dark:text-custom__ghostly rounded-full hover:bg-custom__hoverlight
        dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight 
          focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray
        focus:dark:outline-custom__ghostly"
      >
        {/* arrow icon */}
        <ArrowleftIcon />
      </button>
    </fetcher.Form>
  );
}
