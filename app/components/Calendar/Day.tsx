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
    <div className="w-[3rem] h-[3rem] flex items-center justify-center">
      <Link
        aria-label={day}
        to={`/calendar/${day}`}
        className={clsx(
          'flex flex-col w-full h-full justify-center items-center shadow-sm',
          isToday(parseISO(day)) ? 'border-2 border-blue-200' : '',
          day === params.day ? 'bg-blue-300' : ''
        )}
      >
        {isFirstDayOfMonth(date) ? (
          <span className="text-xs h-full font-bold text-blue-600">
            {monthName}
          </span>
        ) : null}
        {isDayInCurrentYear(date) ? (
          <span>{dayOfMonth}</span>
        ) : (
          <span className="text-gray-300">{dayOfMonth}</span>
        )}
      </Link>
    </div>
  );
}
export { Day };
