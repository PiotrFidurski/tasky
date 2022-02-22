import clsx from 'clsx';
import { format, isFirstDayOfMonth, isToday, parseISO } from 'date-fns';

import { Link, useParams } from 'remix';

import { isDayInCurrentYear } from '~/utils/date';

function Day({ day, stats }: { day: string; stats: Record<string, number[]> }) {
  const [total, complete] = stats[day] ?? [];

  const params = useParams<'day'>();

  // convert string eg: '2022-02-13' back to date
  const date = new Date(day);

  const monthName = format(date, 'MMM');
  const dayOfMonth = date.getDate();

  const completion = (complete / total) * 100;

  return (
    <Link
      aria-label={day}
      to={`/calendar/${day}`}
      className={clsx(
        'relative flex flex-col justify-center items-center min-h-[4rem] p-2 border-r dark:border-custom__gray',
        day === params.day
          ? 'bg-custom__hoverlight dark:bg-custom__hoverdark'
          : null,
        isToday(parseISO(day))
          ? 'before:content-["TODAY"] before:absolute before:top-1 before:text-gray-400 before:dark:text-gray-600 before:font-semibold'
          : null
      )}
    >
      {complete || total ? (
        <div className="absolute bottom-1 flex items-center justify-start max-w-[4rem] bg-transparent w-full border border-gray-400 dark:border-gray-500 transition-all h-2">
          <div
            className={clsx(
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
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
          {monthName}
        </span>
      ) : null}
      {isDayInCurrentYear(date) ? (
        <span className="font-semibold text-custom__gray dark:text-custom__ghostly">
          {dayOfMonth}
        </span>
      ) : (
        <span className="text-gray-300">{dayOfMonth}</span>
      )}
    </Link>
  );
}
export { Day };
