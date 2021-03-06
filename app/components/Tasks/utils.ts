import { Fetcher } from '@remix-run/react/transition';
import { actionTypes } from '~/actions/actionTypes';

export function getActionType(submission: Fetcher['submission']) {
  const action = submission?.formData.get('_action');

  const isScheduling = action === actionTypes.SCHEDULE_TASK;

  const isUnscheduling = action === actionTypes.UNSCHEDULE_TASK;

  return { isScheduling, isUnscheduling };
}
