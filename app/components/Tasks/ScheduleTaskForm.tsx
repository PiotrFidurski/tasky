import { format } from 'date-fns';

import { useParams } from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { DATE_FORMAT } from '~/utils/date';

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
        <ArrowleftIcon />
      </Button>
    </fetcher.Form>
  );
}
