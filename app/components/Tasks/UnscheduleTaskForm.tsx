import { Button } from '~/components/Elements/Button';
import { ArrowrightIcon } from '~/components/Icons/ArrowrightIcon';

import { actionTypes } from '~/actions/actionTypes';

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
