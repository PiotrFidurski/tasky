import { useSubmit } from '@remix-run/react';
import { useRef } from 'react';

export function useProgrammaticSubmit() {
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
