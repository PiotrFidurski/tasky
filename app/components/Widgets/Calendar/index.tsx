import clsx from 'clsx';
import { isBefore, isToday, parseISO } from 'date-fns';

import { formatDate, getCalendarData } from '~/utils/date';

// remove mt later

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const calendarData = getCalendarData({ date: new Date(), weeksCount: 6 });

export function Calendar() {
  return (
    <div className="bg-slate-900 p-4 rounded-xl mt-16">
      <p className="font-bold text-xl mb-4">{formatDate()}</p>
      <div className="flex justify-between mb-4">
        {DAYS.map((day) => (
          <span className="w-10 h-10 flex justify-center items-center">
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

              const isDateBeforeToday = isBefore(date, new Date());

              return (
                <div
                  key={day}
                  className={clsx(
                    'w-10 h-10 flex items-center justify-center rounded-md mb-2 text-s',
                    isTodaysDate && 'border border-gray-700 text-highlight',
                    isDateBeforeToday && !isTodaysDate && 'text-gray-700'
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
