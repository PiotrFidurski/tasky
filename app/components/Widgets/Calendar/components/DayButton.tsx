import clsx from 'clsx';

import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { Form, useParams } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { CREATE_DRAFT_DATE } from '~/components/Modals/actionTypes';

import { DATE_FORMAT } from '~/utils/date';

type DayButtonProps = {
  day: string;
  date: Date;
};

export function DayButton({ day, date }: DayButtonProps) {
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
        isIconWrapper
        name="_action"
        value={CREATE_DRAFT_DATE}
        className={clsx(
          'w-10 h-10 mb-2 justify-center',
          !isSameMonth(currentDate, date) && 'text-slate-800',
          isBefore(currentDate, new Date()) &&
            isSameMonth(currentDate, date) &&
            !isToday(parseISO(day)) &&
            'text-gray-500',
          isToday(parseISO(day)) && 'text-highlight font-bold'
        )}
      >
        {dayOfMonth}
      </Button>
    </Form>
  );
}
