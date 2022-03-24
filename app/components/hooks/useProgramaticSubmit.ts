import { useRef } from 'react';

import { useSubmit } from 'remix';

export function useProgramaticSubmit() {
  const submit = useSubmit();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (formRef?.current) {
      submit(formRef.current, { method: 'post' });
    }
  };

  return { formRef, handleSubmit };
}
