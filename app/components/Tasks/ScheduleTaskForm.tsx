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
        className="p-1 text-custom__gray dark:text-custom__ghostly"
      >
        {/* arrow icon */}
        <ArrowleftIcon />
      </button>
    </fetcher.Form>
  );
}
