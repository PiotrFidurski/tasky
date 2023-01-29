import { ReactNode, useMemo, useState } from 'react';

import { addMonths, startOfMonth, subMonths } from 'date-fns';

import { getCalendarData } from '~/utils/date';

import { calendarContext } from './calendarContext';

type Props = {
  startingDate: Date;
  weeksCount?: number;
  children: ReactNode;
};

export function CalendarProvider({
  startingDate,
  weeksCount = 5,
  children,
}: Props) {
  const [date, setDate] = useState(startingDate);

  const [slideDirection, setSlideDirection] = useState('right');

  const data = getCalendarData({
    date: startOfMonth(date),
    weeksCount,
  });

  const handleNextMonth = () => {
    setDate((prevDate) => addMonths(prevDate, 1));
    setSlideDirection('right');
  };

  const handlePrevMonth = () => {
    setDate((prevDate) => subMonths(prevDate, 1));
    setSlideDirection('left');
  };

  const contextValue = useMemo(
    () => ({ data, slideDirection, handleNextMonth, handlePrevMonth }),
    []
  );

  return (
    <calendarContext.Provider value={contextValue}>
      {children}
    </calendarContext.Provider>
  );
}
