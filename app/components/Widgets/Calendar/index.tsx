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

  const [slideDirection, setSlideDirection] = useState('right');

  const calendarData = getCalendarData({
    date: startOfMonth(date),
    weeksCount: 5,
  });

  const handleNextMonth = () => {
    setDate((prevDate) => addMonths(prevDate, 1));
    setSlideDirection('right');
  };

  const handlePrevMonth = () => {
    setDate((prevDate) => subMonths(prevDate, 1));
    setSlideDirection('left');
  };

  return (
    <div className="bg-slate-900 max-w-sm p-4 rounded-xl mt-16 relative min-h-[24rem] overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        {params.day ? (
          <Header
            date={new Date(params.day)}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        ) : null}
      </div>
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={date.toDateString()}
          className="absolute inset-0 top-16 bg-slate-900 p-4"
          variants={variants}
          custom={slideDirection}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <DayNames />
          <section>
            {calendarData.map((week) => (
              <div key={week[0]} className="flex justify-between items-center">
                {week.map((day) => (
                  <Day day={day} date={date} key={day} stats={stats} />
                ))}
              </div>
            ))}
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
