import { ZodError } from 'zod';
import { createTask } from '~/models/task';
import { getAuthUserId } from '~/session/session.server';
import { schema } from '~/validation/task';

import { ActionFunction, redirect } from 'remix';

import { CreateTask } from '~/components/Modals/CreateTask';

import { badRequest } from '~/utils/badRequest';
import { getErrorMessage } from '~/utils/getErrorMessage';

export const action: ActionFunction = async ({ params, request }) => {
  try {
    const userId = await getAuthUserId(request);

    const form = await request.formData();

    const { body, title } = schema.parse(form);

    await createTask({ body, title, userId });

    return redirect(`/calendar/${params.day}`);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return badRequest({
        errors: { ...errors.fieldErrors },
      });
    }

    throw badRequest({ message: getErrorMessage(error) });
  }
};

export default function CreateTaskRoute() {
  return <CreateTask />;
}
