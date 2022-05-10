import { addMonths, startOfMonth, subMonths } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { useParams } from 'remix';

import { getCalendarData } from '~/utils/date';

import { Day } from './Day';
import { DayNames } from './DayNames';
import { Header } from './Header';
import { variants } from './animationVariants';

// remove mt later from main container

type CalendarProps = {
  startingDate: Date;
  stats: { [key: string]: number[] };
};

export function Calendar({ startingDate, stats }: CalendarProps) {
  const [date, setDate] = useState(startingDate);

  const params = useParams<'day'>();

  const [direction, setDirection] = useState('right');

  const calendarData = getCalendarData({
    date: startOfMonth(date),
    weeksCount: 5,
  });

  const handleNextMonth = () => {
    setDate((prevDate) => addMonths(prevDate, 1));
    setDirection('right');
  };

  const handlePrevMonth = () => {
    setDate((prevDate) => subMonths(prevDate, 1));
    setDirection('left');
  };

  return (
    <div className="bg-slate-900 max-w-sm p-4 rounded-xl mt-16 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        {params.day ? (
          <Header
            date={new Date(params.day)}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        ) : null}
      </div>
      <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
        <motion.div
          key={date.toDateString()}
          variants={variants}
          custom={direction}
          transition={{
            x: { type: 'spring', stiffness: 500, damping: 30 },
          }}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <DayNames />
          <div>
            {calendarData.map((week) => (
              <div key={week[0]} className="flex justify-between items-center">
                {week.map((day) => (
                  <Day day={day} date={date} key={day} stats={stats} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
