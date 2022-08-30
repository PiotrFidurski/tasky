import { useTransition } from 'remix';

export function useActionTransition() {
  const { state, type } = useTransition();

  const isSubmitting =
    (state === 'submitting' && type === 'actionSubmission') ||
    (state === 'loading' && type === 'actionRedirect');

  return { isSubmitting };
}
