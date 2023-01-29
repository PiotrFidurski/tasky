import { useTransition } from 'remix';

export function useActionTransition() {
  const transition = useTransition();

  const { type, state } = transition;

  const isSubmitting =
    (state === 'submitting' && type === 'actionSubmission') ||
    (state === 'loading' && type === 'actionRedirect');

  const currentAction = transition.submission?.formData.get('_action');

  return { transition, isSubmitting, currentAction };
}
