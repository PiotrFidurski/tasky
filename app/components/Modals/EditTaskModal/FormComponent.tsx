import { useEffect, useRef } from 'react';

import { Form, useLoaderData, useParams } from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';
import { loader } from '~/server/loaders/$day.taskId.edit.server';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { CaretUp } from '~/components/Icons/CaretUp';
import { Spinner } from '~/components/Spinner';

import { useActionTransition } from '~/utils/hooks/useActionTransition';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedUser } from '~/types';

export function FormComponent() {
  const { body, scheduledFor } = useLoaderData<typeof loader>();

  const { isSubmitting, transition } = useActionTransition();

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
      <input type="hidden" name="scheduledFor" value={scheduledFor} />
      <FieldWrapper htmlFor="body" errorMessage="" labelName="Task body">
        <InputField ref={inputRef} defaultValue={body} name="body" />
      </FieldWrapper>
      <div className="flex justify-end">
        <Button
          primary
          type="submit"
          name="_action"
          value={actionTypes.UPDATE_TASK}
          className="flex items-center gap-4 px-8 py-4 text-sm shadow-md shadow-shadowSecondary dark:shadow-shadowPrimary"
        >
          <span>Update</span>
          {isSubmitting &&
          transition.submission?.formData.get('_action') ===
            actionTypes.UPDATE_TASK ? (
            <Spinner />
          ) : (
            <CaretUp />
          )}
        </Button>
      </div>
    </Form>
  );
}
