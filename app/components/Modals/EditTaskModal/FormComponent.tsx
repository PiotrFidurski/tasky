import { useEffect, useRef } from 'react';

import { Form, useLoaderData } from '@remix-run/react';

import { loader } from '~/server/loaders/editTask.server';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

export function FormComponent() {
  const { body } = useLoaderData<typeof loader>();

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
        <Button primary type="submit">
          Update
        </Button>
      </div>
    </Form>
  );
}
