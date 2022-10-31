import { useEffect, useRef } from 'react';

import {
  Form,
  useActionData,
  useLoaderData,
  useParams,
} from '@remix-run/react';

import { EditTaskAction } from '~/server/actions/$day.taskId.edit.server';
import { actionTypes } from '~/server/actions/actionTypes';
import { EditTaskLoader } from '~/server/loaders/$day.taskId.edit.server';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { CaretUp } from '~/components/Icons/CaretUp';
import { Spinner } from '~/components/Spinner';

import { useActionTransition } from '~/utils/hooks/useActionTransition';
import { useErrors } from '~/utils/hooks/useErrors';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedUser } from '~/types';

import { UPDATE_TASK } from '../actionTypes';

export function FormComponent() {
  const { body, scheduledFor } = useLoaderData<EditTaskLoader>();

  const editTaskActionData = useActionData<EditTaskAction>();

  const { fieldErrors } = useErrors(editTaskActionData);

  const { isSubmitting, currentAction } = useActionTransition();

  const data = useRouteData<{ user: JsonifiedUser }>('root');

  const params = useParams<'day' | 'taskId'>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Form method="post" replace className="w-full p-4">
      <input type="hidden" name="id" value={params.taskId} />
      <input type="hidden" name="ownerId" value={data?.user?.id} />
      <input type="hidden" name="scheduledFor" value={scheduledFor} />
      <FieldWrapper
        id="body"
        htmlFor="body"
        errorMessage={fieldErrors?.body || ''}
        labelName="Task body"
        className="mb-3"
      >
        <InputField ref={inputRef} defaultValue={body} name="body" id="body" />
      </FieldWrapper>
      <div className="flex justify-end">
        <Button
          primary
          type="submit"
          name="_action"
          value={UPDATE_TASK}
          className="flex items-center gap-4 px-8 py-4 text-sm shadow-md shadow-shadowSecondary dark:shadow-shadowPrimary"
        >
          <span>Update</span>
          {isSubmitting && currentAction === actionTypes.UPDATE_TASK ? (
            <Spinner />
          ) : (
            <CaretUp />
          )}
        </Button>
      </div>
    </Form>
  );
}
