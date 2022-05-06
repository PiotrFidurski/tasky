import clsx from 'clsx';

import { CustomLink } from '~/components/Elements/CustomLink';

import { getCalendarDayHelpers } from '~/utils/date';

type DayProps = {
  day: string;
  date: Date;
  stats: { [key: string]: number[] };
};

export function Day({ day, date, stats }: DayProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);

  const [total, complete] = stats[day] ?? [];

  return (
    <CustomLink
      to={`/home/${day}/completed`}
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-full mb-2 text-s font-bold relative',
        isTodaysDate && 'border border-gray-700 text-highlight',
        isDateBeforeToday && !isTodaysDate && 'text-gray-500',
        !isInThisMonth && 'text-gray-800'
      )}
    >
      {dayOfMonth}
      {total !== complete ? (
        <span className="absolute top-4 text-indigo-300 text-2xl">·</span>
      ) : (
        ''
      )}
      {total && total === complete ? (
        <span className="absolute top-4 text-pink-600 text-2xl">·</span>
      ) : (
        ''
      )}
    </CustomLink>
  );
}
