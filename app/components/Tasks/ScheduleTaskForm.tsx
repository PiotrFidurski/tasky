import { useParams } from '@remix-run/react';
import { format } from 'date-fns';
import { actionTypes } from '~/actions/actionTypes';

import { DATE_FORMAT } from '~/utils/date';

import { Button } from '../Elements/Button';
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
      <input
        name="date"
        value={!day ? format(new Date(), DATE_FORMAT) : day}
        type="hidden"
      />
      <input name="id" value={task.id} type="hidden" />
      <Button type="submit" aria-label="schedule task">
        {/* arrow icon */}
        <ArrowleftIcon />
      </Button>
    </fetcher.Form>
  );
}
