import { useContext } from 'react';

import { calendarContext } from './calendarContext';

export function useCalendar() {
  const context = useContext(calendarContext);

  if (!context)
    throw new Error(
      'You are using CalendarContext outside of Calendar Provider.'
    );

  return context;
}
