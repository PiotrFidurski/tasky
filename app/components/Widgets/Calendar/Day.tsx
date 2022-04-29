import clsx from 'clsx';

import { getCalendarDayHelpers } from '~/utils/date';

type DayProps = {
  day: string;
  date: Date;
};

export function Day({ day, date }: DayProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);

  return (
    <div
      key={day}
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-md mb-2 text-s font-bold',
        isTodaysDate && 'border border-gray-700 text-highlight',
        isDateBeforeToday && !isTodaysDate && 'text-gray-500',
        !isInThisMonth && 'text-gray-800'
      )}
    >
      {dayOfMonth}
    </div>
  );
}
