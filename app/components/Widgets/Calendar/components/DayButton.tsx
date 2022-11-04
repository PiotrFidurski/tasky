import { twMerge } from 'tailwind-merge';

import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { Form, useParams } from '@remix-run/react';

import { actionTypes } from '~/server/actions/actionTypes';

import { Button } from '~/components/Elements/Button';

import { DATE_FORMAT } from '~/utils/date';

type Props = {
  day: string;
  date: Date;
};

export function DayButton({ day, date }: Props) {
  const currentDate = new Date(day);

  const params = useParams<'day'>();

  const dayOfMonth = format(currentDate, 'dd');

  return (
    <Form method="post" action={`/${params.day}/create`}>
      <input
        name="scheduledFor"
        type="hidden"
        value={format(new Date(day), DATE_FORMAT)}
      />
      <Button
        name="_action"
        type="submit"
        value={actionTypes.CREATE_DRAFT_DATE}
        className={twMerge(
          'w-10 h-10 mb-2 flex items-center border-transparent dark:border-transparent justify-center',
          !isSameMonth(currentDate, date) &&
            'dark:text-slate-800 text-slate-300',
          isBefore(currentDate, new Date()) &&
            isSameMonth(currentDate, date) &&
            !isToday(parseISO(day)) &&
            'text-gray-500 dark:text-gray-600',
          isToday(parseISO(day)) &&
            'text-highlight dark:text-highlight font-bold'
        )}
      >
        {dayOfMonth}
      </Button>
    </Form>
  );
}
