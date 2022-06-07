import { z } from 'zod';
import { ZodTaskErrors } from '~/validation/task';

import {
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from 'remix';

import { Button } from '~/components/Elements/Button';
import { FieldWrapper } from '~/components/Form/FieldWrapper';
import { InputField } from '~/components/Form/InputField';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';

import { formatDate } from '~/utils/date';
import { useErrors } from '~/utils/hooks/useErrors';

type ActionData = z.infer<typeof ZodTaskErrors>;

type FormComponentProps = {
  draft: { title: string; body: string };
};

export function FormComponent({ draft }: FormComponentProps) {
  const fetcher = useFetcher();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const actionData = useActionData<ActionData>();

  const { day } = useParams<'day'>();

  const { fieldErrors } = useErrors(actionData);

  return (
    <div className="py-4">
      <Form method="post" className="p-4">
        <div className="w-full mb-2">
          <FieldWrapper
            htmlFor="title"
            errorMessage={fieldErrors?.title || ''}
            labelName="Title"
          >
            <InputField
              autoComplete="off"
              placeholder="task title"
              required
              defaultValue={draft.title}
              aria-label="title"
              name="title"
              id="title"
            />
          </FieldWrapper>
          <FieldWrapper
            htmlFor="body"
            labelName="Body"
            errorMessage={fieldErrors?.body || ''}
          >
            <InputField
              autoComplete="off"
              placeholder="What do you want to do today?"
              required
              defaultValue={draft.body}
              aria-label="body"
              name="body"
              id="body"
            />
          </FieldWrapper>

          <button
            className="flex border-2 border-gray-500 outline-none rounded-md text-lightGray focus-within:border-2 focus-within:border-highlight focus:text-highlight transition-colors"
            onClick={(e) => {
              fetcher.submit(e.currentTarget, { method: 'post' });
              navigate(`/calendar/${day}/calendar`);
            }}
            type="button"
            name="task_draft"
            value="task_draft"
          >
            <FieldWrapper
              labelName="Date"
              htmlFor="date"
              errorMessage=""
              hasIcon
              className="mb-0 outline-none border-none"
              icon={<CalendarIcon />}
            >
              <InputField
                autoComplete="off"
                disabled
                aria-label="date"
                name="date"
                id="date"
                defaultValue={searchParams.get('selectedDate') ?? formatDate()}
              />
            </FieldWrapper>
          </button>
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded-full font-bold px-4 py-2 justify-center border-2 bg-highlight dark:text-black"
            primary
          >
            <span>Create task</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
