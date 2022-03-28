import { Task } from '@prisma/client';
import { Fetcher } from '@remix-run/react/transition';

import { FormProps } from 'remix';

export type ComponentWithFetcherProps<TData> = {
  task: Task;
  fetcher: {
    Form: React.ForwardRefExoticComponent<
      FormProps & React.RefAttributes<HTMLFormElement>
    >;
  } & Fetcher<TData>;
};
