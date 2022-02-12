import clsx from 'clsx';
import { format, isFirstDayOfMonth, isToday } from 'date-fns';

import { Link, useParams } from 'remix';

import { formatDate, isDayInCurrentYear } from '~/utils/date';

function Day({ day }: { day: Date }) {
  const params = useParams<'day'>();

  const dateOfDay = formatDate(day);
  const monthName = format(day, 'MMM');
  const dayOfMonth = day.getDate();

  return (
    <div className="w-[3rem] h-[3rem] flex items-center justify-center">
      <Link
        aria-label={dateOfDay}
        to={`/calendar/${dateOfDay}`}
        className={clsx(
          'flex flex-col w-full h-full justify-center items-center shadow-sm',
          isToday(day) ? 'border-2 border-blue-200' : '',
          dateOfDay === params.day ? 'bg-blue-300' : ''
        )}
      >
        {isFirstDayOfMonth(day) ? (
          <span className="text-xs h-full font-bold text-blue-600">
            {monthName}
          </span>
        ) : null}
        {isDayInCurrentYear(day) ? (
          <span>{dayOfMonth}</span>
        ) : (
          <span className="text-gray-300">{dayOfMonth}</span>
        )}
      </Link>
    </div>
  );
}
export { Day };
