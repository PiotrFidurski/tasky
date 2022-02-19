import clsx from 'clsx';
import { format, isFirstDayOfMonth, isToday, parseISO } from 'date-fns';

import { Link, useParams } from 'remix';

import { isDayInCurrentYear } from '~/utils/date';

function Day({ day }: { day: string }) {
  const params = useParams<'day'>();
  // convert string eg: '2022-02-13' back to date
  const date = new Date(day);

  const monthName = format(date, 'MMM');
  const dayOfMonth = date.getDate();

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
          ? 'before:content-["TODAY"] before:absolute before:top-1 before:text-gray-300 before:dark:text-gray-600 font-semibold before:text-center'
          : null
      )}
    >
      {isFirstDayOfMonth(date) ? (
        <span className="text-xs h-full font-bold text-blue-600">
          {monthName}
        </span>
      ) : null}
      {isDayInCurrentYear(date) ? (
        <span className="font-semibold dark:text-custom__ghostly">
          {dayOfMonth}
        </span>
      ) : (
        <span className="text-gray-300">{dayOfMonth}</span>
      )}
    </Link>
  );
}
export { Day };
