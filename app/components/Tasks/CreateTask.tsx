import { Form } from 'remix';

import { Button } from '../Elements/Button';
import { FieldWrapper } from '../Form/FieldWrapper';
import { InputField } from '../Form/InputField';

function CreateTask({ errorMessage }: { errorMessage: string | string[] }) {
  return (
    <Form method="post" className="p-4 shadow-md">
      <div className="w-full mb-2">
        <FieldWrapper htmlFor="task" errorMessage={errorMessage}>
          <InputField aria-label="body" name="body" id="task" />
        </FieldWrapper>
      </div>
      <Button type="submit">Add task</Button>
    </Form>
  );
}

export { CreateTask };
