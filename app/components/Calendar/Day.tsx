import { twMerge } from 'tailwind-merge';

import {
  format,
  isFirstDayOfMonth,
  isThisYear,
  isToday,
  parseISO,
} from 'date-fns';

import { Link, useParams } from '@remix-run/react';

export function Day({
  day,
  stats,
}: {
  day: string;
  stats: Record<string, number[]>;
}) {
  const [total, complete] = stats[day] ?? [];

  const params = useParams<'day'>();

  const date = new Date(day);

  const monthName = format(date, 'MMM');

  const dayOfMonth = date.getDate();

  const completion = (complete / total) * 100;

  return (
    <Link
      aria-label={day}
      to={`/calendar/${day}`}
      className={twMerge(
        'relative flex flex-col justify-center items-center min-h-[4rem] p-2 border-r',
        day === params.day ? '' : null,
        isToday(parseISO(day))
          ? 'before:content-["TODAY"] before:absolute before:top-1 before:font-semibold'
          : null
      )}
    >
      {complete || total ? (
        <div className="absolute bottom-1 flex items-center justify-start max-w-[4rem] bg-transparent w-full border border-gray-400 dark:border-gray-500 transition-all h-2">
          <div
            className={twMerge(
              'h-full transition-all bg-gradient-to-r',
              complete === total
                ? 'from-green-400 via-green-400 to-green-400'
                : 'from-blue-500 via-blue-600 to-blue-700'
            )}
            style={{ width: `${completion}%` }}
          />
        </div>
      ) : null}
      {isFirstDayOfMonth(date) ? (
        <span className="text-xs font-bold">{monthName}</span>
      ) : null}
      {isThisYear(date) ? (
        <span className="font-semibold">{dayOfMonth}</span>
      ) : (
        <span className=" ">{dayOfMonth}</span>
      )}
    </Link>
  );
}
