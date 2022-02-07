import { useEffect, useState } from 'react';

import { useTransition } from 'remix';

/**
 * This hook accepts `actionData` returned from `useActionData` remix hook,
 * and based on transition `state` it produces an object with error fields.
 * It takes care of resetting errors when submitting form with the same values,
 * so that the error messages can be used inside of `aria-live` element.
 *
 * @param actionData - data object returned from `useActionData` hook.
 * @returns `fieldErrors` - object with error fields depending on `actionData` provided.
 * @example
 * ```ts
 * const actionData = { errors: {
 *    username: ['some error message'],
 *    password: ['some password error']
 * }
 *
 * const { fieldErrors } = useErrors(actionData);
 *
 * { username: ['some error message'], password: ['some password error'] }
 *```
 */
export function useErrors<T>(actionData: { errors: T } | undefined) {
  const [errors, setErrors] = useState<{ fieldErrors: T } | {}>({});

  const { state } = useTransition();

  useEffect(() => {
    setErrors({ fieldErrors: {} });

    if (state === 'idle' && actionData?.errors) {
      setErrors({ fieldErrors: { ...actionData.errors } });
    }
  }, [state, actionData]);

  return { ...errors };
}
