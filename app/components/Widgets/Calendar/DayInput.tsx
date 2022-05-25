import clsx from 'clsx';

import { useNavigate, useParams } from 'remix';

import { formatDate, getCalendarDayHelpers } from '~/utils/date';

type DayInputProps = {
  day: string;
  date: Date;
  stats: { [key: string]: number[] };
};

export function DayInput({ day, date, stats }: DayInputProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);

  const params = useParams<'day'>();

  const navigate = useNavigate();
  //   const [total, complete] = stats[day] ?? [];
  const isActive = day === params.day;

  return (
    <div className="relative focus-within:ring-2 focus-within:ring-highlight rounded-full w-10 h-10 mb-2 px-1 flex items-center">
      <input
        onClick={(e) => {
          return navigate(
            `/calendar/${params.day}/create?selectedDate=${e.currentTarget.value}`
          );
        }}
        onKeyPress={(e) => {
          return navigate(
            `/calendar/${params.day}/create?selectedDate=${e.currentTarget.value}`
          );
        }}
        className={clsx(
          'w-full h-auto overflow-hidden bg-transparent focus-visible:text-fill-transparent text-center z-10 text-transparent focus:text-transparent select-none focus:selection:text-transparent',
          isTodaysDate &&
            !isActive &&
            'ring-2 dark:ring-highlight dark:text-highlight ring-highlightDarker text-highlightDarker',
          isDateBeforeToday && !isTodaysDate && 'text-gray-500',
          !isInThisMonth && 'text-gray-800'
        )}
        defaultValue={formatDate(new Date(day))}
      />
      <div className="absolute inset-0 rounded-full flex items-center justify-center bg-slate-900">
        {dayOfMonth}
      </div>
    </div>
  );
}

/* {dayOfMonth}
      {total !== complete ? (
        <span className="absolute top-4 text-indigo-300 text-2xl">·</span>
      ) : null}
      {total && total === complete ? (
        <span className="absolute top-4 text-pink-600 text-2xl">·</span>
      ) : null} */
