import { Fetcher, FormProps } from '@remix-run/react';
import { JsonifiedTask } from '~/types';

export type ComponentWithFetcherProps<TData> = {
  task: JsonifiedTask;
  fetcher: {
    Form: React.ForwardRefExoticComponent<
      FormProps & React.RefAttributes<HTMLFormElement>
    >;
  } & Fetcher<TData>;
};
