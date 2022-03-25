import { useRef } from 'react';

import { useSubmit } from 'remix';

type ProgramaticSubmitProps = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  handleSubmit: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function useProgramaticSubmit(): ProgramaticSubmitProps {
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
