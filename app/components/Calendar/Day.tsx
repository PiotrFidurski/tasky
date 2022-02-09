import clsx from 'clsx';
import { isFirstDayOfMonth } from 'date-fns';

import { Link, useParams } from 'remix';

import { formatDate, months } from '~/utils/date';

function Day({ day }: { day: Date }) {
  const params = useParams<'day'>();

  const dayDate = formatDate(day);
  const monthName = months[day.getMonth()];
  const dayOfMonth = day.getDate();

  return (
    <div className="w-[3rem] h-[3rem] flex items-center justify-center">
      <Link
        aria-label={dayDate}
        to={`/calendar/${dayDate}`}
        className={clsx(
          'flex flex-col w-full h-full justify-center items-center shadow-sm',
          formatDate() === dayDate ? 'border-2 border-blue-200' : '',
          dayDate === params.day ? 'bg-blue-300' : ''
        )}
      >
        {isFirstDayOfMonth(day) ? (
          <span className="text-xs h-full font-bold text-blue-600">
            {monthName}
          </span>
        ) : null}
        <span>{dayOfMonth}</span>
      </Link>
    </div>
  );
}
export { Day };
