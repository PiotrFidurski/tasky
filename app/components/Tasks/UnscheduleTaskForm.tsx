import { actionTypes } from '~/actions/actionTypes';

import { Button } from '../Elements/Button';
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
      <Button type="submit" aria-label="unschedule task">
        <ArrowrightIcon />
      </Button>
    </fetcher.Form>
  );
}
