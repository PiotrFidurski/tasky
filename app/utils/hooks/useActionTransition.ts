import { useTransition } from 'remix';

export function useActionTransition() {
  const transition = useTransition();

  const isSubmitting =
    (transition.state === 'submitting' &&
      transition.type === 'actionSubmission') ||
    (transition.state === 'loading' && transition.type === 'actionRedirect');
  return { isSubmitting, transition };
}
