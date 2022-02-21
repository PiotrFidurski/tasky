import clsx from 'clsx';
import { format, isFirstDayOfMonth, isToday, parseISO } from 'date-fns';

import { Link, useParams } from 'remix';

import { isDayInCurrentYear } from '~/utils/date';
import { GroupedTask, getDayStats } from '~/utils/getDayStats';

function Day({
  day,
  groupedTasks,
}: {
  day: string;
  groupedTasks: Array<GroupedTask>;
}) {
  const [total, complete] = getDayStats(groupedTasks, day);

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
      <div
        className="absolute bottom-1 left-2 bg-blue-600 w-2 transition-all"
        style={{
          maxHeight: `calc(100% - 8px)`,
          height: `${completion}%`,
        }}
      />
      {complete === 0 ? (
        <div className="absolute top-2 right-2 bg-red-400 rounded-full h-2 w-2" />
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
