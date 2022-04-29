import { addMonths, startOfMonth, subMonths } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

import { getCalendarData } from '~/utils/date';

import { Day } from './Day';
import { DayNames } from './DayNames';
import { Header } from './Header';

// remove mt later from main container

type CalendarProps = {
  date: Date;
};

export function Calendar({ date }: CalendarProps) {
  const [dateState, setDateState] = useState(date);

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
        <Header date={dateState} />
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
          <DayNames />
          <div>
            {calendarData.map((week, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex justify-between items-center"
              >
                {week.map((day) => (
                  <Day day={day} date={dateState} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
