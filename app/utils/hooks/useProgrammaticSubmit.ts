import { useRef } from 'react';

import { useSubmit } from 'remix';

type ProgrammaticSubmitProps = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  handleSubmit: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function useProgrammaticSubmit(): ProgrammaticSubmitProps {
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
