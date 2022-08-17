import clsx from 'clsx';

import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { useParams } from '@remix-run/react';

import { CustomLink } from '~/components/Elements/CustomLink';

type DayProps = {
  day: string;
  date: Date;
  stats: { [key: string]: number[] };
};

export function DayLink({ day, date, stats }: DayProps) {
  const currentDate = new Date(day);

  const dayOfMonth = format(currentDate, 'dd');

  const params = useParams<'day'>();

  const [total, complete] = stats[day] ?? [];

  const isActive = day === params.day;

  return (
    <CustomLink
      isActive={isActive}
      to={`/${day}`}
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-full mb-2 text-s relative',
        !isSameMonth(currentDate, date) && 'dark:text-slate-800 text-slate-300',
        isBefore(currentDate, new Date()) &&
          isSameMonth(currentDate, date) &&
          !isToday(parseISO(day)) &&
          'text-gray-500 dark:text-gray-600',
        isToday(parseISO(day)) && 'text-highlight dark:text-highlight font-bold'
      )}
    >
      {dayOfMonth}
      {total !== complete ? (
        <span className="absolute top-4 text-2xl">·</span>
      ) : null}
      {total && total === complete ? (
        <span className="absolute top-4 text-pink-600 text-2xl">·</span>
      ) : null}
    </CustomLink>
  );
}
