import { useEffect, useState } from 'react';

import { useTransition } from '@remix-run/react';

type UseErrorsProps<T> =
  | {
      errors: T | null;
    }
  | { message: string }
  | undefined;

type Errors<T> = {
  fieldErrors: T | null;
};

/**
 * This hook accepts `actionData` returned from `useActionData` remix hook,
 * and based on transition `state` it produces an object with error fields.
 * It takes care of resetting errors when submitting form with the same values,
 * so that the error messages can be used inside of `aria-live` element.
 *
 * @param actionData - data returned from `useActionData` hook.
 * @returns `fieldErrors` - object with error fields depending on `actionData` provided.
 */
export function useErrors<T>(actionData: UseErrorsProps<T>) {
  const [errors, setErrors] = useState<Errors<T> | null>(null);

  const { state } = useTransition();

  useEffect(() => {
    setErrors({ fieldErrors: null });

    if (state === 'idle' && actionData?.errors) {
      setErrors({ fieldErrors: { ...actionData.errors } });
    }
  }, [state, actionData]);

  return { ...errors };
}
