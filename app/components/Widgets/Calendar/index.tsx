import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { useMemo, useState } from 'react';

import { addMonths, startOfMonth, subMonths } from 'date-fns';

import { useParams } from '@remix-run/react';

import { getCalendarData } from '~/utils/date';

import { variants } from './animationVariants';
import { DaysOfWeek } from './components/DaysOfWeek';
import { Header } from './components/Header';
import { HEADER_SIZE, ROWS_POSTION_TOP, ROW_SIZE } from './consts';

type RenderProps = {
  day: string;
  date: Date;
  stats?: { [key: string]: number[] };
};

type Props = {
  startingDate: Date;
  stats?: { [key: string]: number[] };
  weeksCount?: number;
  children: (props: RenderProps) => JSX.Element;
  wrapperClassname?: string;
};

export function Calendar({
  startingDate,
  stats,
  weeksCount = 5,
  children,
  wrapperClassname,
}: Props) {
  const [date, setDate] = useState(startingDate);

  const params = useParams<'day'>();

  const [slideDirection, setSlideDirection] = useState('right');

  const calendarData = useMemo(
    () =>
      getCalendarData({
        date: startOfMonth(date),
        weeksCount,
      }),
    [date]
  );

  const handleNextMonth = () => {
    setDate((prevDate) => addMonths(prevDate, 1));
    setSlideDirection('right');
  };

  const handlePrevMonth = () => {
    setDate((prevDate) => subMonths(prevDate, 1));
    setSlideDirection('left');
  };

  return (
    <div
      className={twMerge(
        'bg-light-rgba dark:bg-dark-rgba w-full max-w-sm p-4 rounded-xl relative overflow-hidden mb-4 text-secondary dark:text-primary',
        wrapperClassname
      )}
      style={{
        minHeight: `calc(${weeksCount} * ${ROW_SIZE}rem + ${HEADER_SIZE}rem + ${ROWS_POSTION_TOP}rem)`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        {params.day ? (
          <Header
            date={date}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        ) : null}
      </div>
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={date.toDateString()}
          style={{ top: `${ROWS_POSTION_TOP}rem` }}
          className="p-4 absolute inset-0 bottom-auto"
          variants={variants}
          custom={slideDirection}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <DaysOfWeek />
          <section>
            {calendarData.map((week) => (
              <div key={week[0]} className="flex justify-between items-center">
                {week.map((day) => children({ day, date, stats }))}
              </div>
            ))}
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
