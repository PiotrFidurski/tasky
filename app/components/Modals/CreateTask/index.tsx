import * as Dialog from '@radix-ui/react-dialog';

import {
  Form,
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from '@remix-run/react';

import { CreateTaskProps } from '~/server/models/types';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { DESTROY_DRAFT } from '../actionTypes';
import { modalContent, modalOverlay } from '../classNames';
import { FormComponent } from './FormComponent';

type Props = {
  draft: Omit<CreateTaskProps, 'userId'>;
};

export function CreateTask({ draft }: Props) {
  const navigate = useNavigate();

  const { day } = useParams<'day'>();

  const fetcher = useFetcher();

  const [searchParams] = useSearchParams();

  const handleOpenChange = () => {
    fetcher.submit({ _action: DESTROY_DRAFT }, { method: 'post' });

    if (searchParams.get('selectedDate')) {
      return navigate(-2);
    }

    return navigate(-1);
  };

  return (
    <Dialog.Root defaultOpen onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <Form
            method="post"
            action={`/${day}/create`}
            className="w-full flex p-4 items-center"
          >
            <Dialog.Close asChild>
              <Button type="submit" name="_action" value={DESTROY_DRAFT}>
                <ArrowleftIcon />
              </Button>
            </Dialog.Close>
            <div className="w-full text-center pr-[20px]">
              <Dialog.Title>Create task</Dialog.Title>
            </div>
            <Dialog.Description className="sr-only">
              Create task dialog
            </Dialog.Description>
          </Form>
          <FormComponent draft={draft} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
