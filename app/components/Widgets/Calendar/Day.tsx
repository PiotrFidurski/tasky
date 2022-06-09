import clsx from 'clsx';

import { useParams } from 'remix';

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

  const params = useParams<'day'>();

  const [total, complete] = stats[day] ?? [];

  const isActive = day === params.day;

  return (
    <CustomLink
      isActive={isActive}
      to={`/${day}`}
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-full mb-2 text-s font-bold relative',
        isTodaysDate && !isActive && 'ring-2 ring-highlight text-highlight',
        isDateBeforeToday && !isTodaysDate && '',
        !isInThisMonth && ''
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
