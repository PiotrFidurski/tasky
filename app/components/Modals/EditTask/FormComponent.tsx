import { useEffect, useRef } from 'react';

import { Form, useLoaderData } from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

type LoaderData = { body: string };

export function FormComponent() {
  const { body } = useLoaderData<LoaderData>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Form method="post" className="w-full p-4">
      <FieldWrapper htmlFor="body" errorMessage="" labelName="Task body">
        <InputField ref={inputRef} defaultValue={body} />
      </FieldWrapper>
      <div className="flex justify-end">
        <Button primary>Update</Button>
      </div>
    </Form>
  );
}
