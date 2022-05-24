import clsx from 'clsx';

import { useParams } from 'remix';

import { getCalendarDayHelpers } from '~/utils/date';

type DayInputProps = {
  day: string;
  date: Date;
  stats: { [key: string]: number[] };
};

export function DayInput({ day, date, stats }: DayInputProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);
  console.log({ stats });
  const params = useParams<'day'>();

  //   const [total, complete] = stats[day] ?? [];

  const isActive = day === params.day;

  return (
    <input
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-full mb-2 text-s font-bold relative',
        isTodaysDate &&
          !isActive &&
          'ring-2 dark:ring-highlight dark:text-highlight ring-highlightDarker text-highlightDarker',
        isDateBeforeToday && !isTodaysDate && 'text-gray-500',
        !isInThisMonth && 'text-gray-800'
      )}
      value={dayOfMonth}
    />
  );
}

/* {dayOfMonth}
      {total !== complete ? (
        <span className="absolute top-4 text-indigo-300 text-2xl">·</span>
      ) : null}
      {total && total === complete ? (
        <span className="absolute top-4 text-pink-600 text-2xl">·</span>
      ) : null} */
