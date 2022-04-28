import clsx from 'clsx';
import { format, isBefore, isToday, parseISO, startOfMonth } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { getCalendarData } from '~/utils/date';

// remove mt later

type CalendarProps = {
  date: Date;
};

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function Calendar({ date }: CalendarProps) {
  const calendarData = getCalendarData({
    date: startOfMonth(date),
    weeksCount: 5,
  });

  return (
    <div className="bg-slate-900 p-4 rounded-xl mt-16">
      <div className="flex items-center justify-between  mb-4">
        <p className="font-bold text-xl">{format(date, 'dd MMMM, yyyy')}</p>
        <div className="flex gap-4">
          <Button>
            <ArrowleftIcon />
          </Button>
          <Button className="rotate-180">
            <ArrowleftIcon />
          </Button>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={date.toDateString()}
          initial={{ opacity: 0, y: 200 }}
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
                  const currentDate = new Date(day);

                  const dayOfMonth = currentDate.getDate();
                  const isTodaysDate = isToday(parseISO(day));

                  const isDateBeforeToday = isBefore(currentDate, new Date());
                  return (
                    <div
                      key={day}
                      className={clsx(
                        'w-10 h-10 flex items-center justify-center rounded-md mb-2 text-s font-bold',
                        isTodaysDate && 'border border-gray-700 text-highlight',
                        isDateBeforeToday && !isTodaysDate && 'text-gray-500'
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
