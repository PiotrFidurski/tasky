import clsx from 'clsx';
import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { getCalendarData } from '~/utils/date';

// remove mt later

type CalendarProps = {
  month: number;
};

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const calendarData = getCalendarData({
  date: new Date(),
  weeksCount: 6,
});

export function Calendar({ month }: CalendarProps) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl mt-16">
      <p className="font-bold text-xl mb-4">
        {format(new Date(), 'dd MMMM, yyyy')}
      </p>
      <div className="flex justify-between mb-4">
        {DAYS.map((day) => (
          <span className="w-10 h-10 flex justify-center items-center text-gray-300">
            {day}
          </span>
        ))}
      </div>
      <div>
        {calendarData.map((week, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="flex justify-between items-center"
          >
            {week.map((day) => {
              const date = new Date(day);

              const dayOfMonth = date.getDate();
              const isTodaysDate = isToday(parseISO(day));

              // fake aprils date
              const isDayInCurrentMonth = isSameMonth(date, month);

              const isDateBeforeToday = isBefore(date, new Date());

              return (
                <div
                  key={day}
                  className={clsx(
                    'w-10 h-10 flex items-center justify-center rounded-md mb-2 text-s font-bold',
                    isTodaysDate && 'border border-gray-700 text-highlight',
                    isDateBeforeToday && !isTodaysDate && 'text-gray-500',
                    !isDayInCurrentMonth && !isTodaysDate && 'text-gray-800'
                  )}
                >
                  {dayOfMonth}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
