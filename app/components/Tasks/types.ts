import { Task } from '@prisma/client';
import { FormProps } from '@remix-run/react';
import { Fetcher } from '@remix-run/react/transition';

export type ComponentWithFetcherProps<TData> = {
  task: Task;
  fetcher: {
    Form: React.ForwardRefExoticComponent<
      FormProps & React.RefAttributes<HTMLFormElement>
    >;
  } & Fetcher<TData>;
};
