import { Form } from 'remix';

import { Button } from './Elements/Button';
import { FieldWrapper } from './Form/FieldWrapper';
import { InputField } from './Form/InputField';

function CreateTask({ errorMessage }: { errorMessage: string | string[] }) {
  return (
    <Form method="post" className="max-w-xl py-4 px-4 shadow-md">
      <div className="w-full mb-2">
        <FieldWrapper htmlFor="task" errorMessage={errorMessage}>
          <InputField required aria-label="body" name="body" id="task" />
        </FieldWrapper>
      </div>
      <button
        className="py-2 bg-blue-600 w-full font-bold uppercase text-white rounded px-2"
        type="submit"
      >
        Add task
      </button>
    </Form>
  );
}

export { CreateTask };
