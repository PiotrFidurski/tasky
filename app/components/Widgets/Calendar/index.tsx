import clsx from 'clsx';
import { addMonths, format, isToday, startOfMonth, subMonths } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { getCalendarData, getCalendarDayHelpers } from '~/utils/date';

// remove mt later from main container

type CalendarProps = {
  date: Date;
};

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function Calendar({ date }: CalendarProps) {
  const [dateState, setDateState] = useState(date);

  const dateHeader = format(
    isToday(dateState) ? dateState : startOfMonth(dateState),
    'dd MMMM, yyyy'
  );

  const calendarData = getCalendarData({
    date: startOfMonth(dateState),
    weeksCount: 5,
  });

  const handleNextMonth = () => {
    const currentMonth = dateState;
    const nextMonth = addMonths(currentMonth, 1);

    setDateState(nextMonth);
  };

  const handlePrevMonth = () => {
    const currentMonth = dateState;
    const prevMonth = subMonths(currentMonth, 1);

    setDateState(prevMonth);
  };

  return (
    <div className="bg-slate-900 p-4 rounded-xl mt-16">
      <div className="flex items-center justify-between  mb-4">
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.p
            key={dateState.toDateString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-xl"
          >
            {dateHeader}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-4">
          <Button onClick={handlePrevMonth}>
            <ArrowleftIcon />
          </Button>
          <Button className="rotate-180" onClick={handleNextMonth}>
            <ArrowleftIcon />
          </Button>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={dateState.toDateString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-between mb-4">
            {DAYS.map((day) => (
              <span
                key={day}
                className="w-10 h-10 flex justify-center items-center text-gray-300"
              >
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
                  const {
                    isTodaysDate,
                    dayOfMonth,
                    isDateBeforeToday,
                    isInThisMonth,
                  } = getCalendarDayHelpers(day, dateState);

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
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
