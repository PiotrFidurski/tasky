import { useEffect, useRef } from 'react';

import { Form, useLoaderData, useParams } from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';

import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedUser } from '~/types';

export function FormComponent() {
  const { body } = useLoaderData();
  const data = useRouteData<{ user: JsonifiedUser }>('root');
  const params = useParams<'day' | 'taskId'>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Form method="post" className="w-full p-4" action={`/${params.day}`}>
      <input type="hidden" name="id" value={params.taskId} />
      <input type="hidden" name="ownerId" value={data?.user?.id} />
      <FieldWrapper htmlFor="body" errorMessage="" labelName="Task body">
        <InputField ref={inputRef} defaultValue={body} name="body" />
      </FieldWrapper>
      <div className="flex justify-end">
        <Button
          primary
          type="submit"
          name="_action"
          value={actionTypes.UPDATE_TASK}
        >
          Update
        </Button>
      </div>
    </Form>
  );
}
