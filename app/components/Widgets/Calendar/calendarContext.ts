import { createContext } from 'react';

type CalendarContextProps = {
  data: string[][];
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  slideDirection: string;
};

export const calendarContext = createContext<CalendarContextProps | null>(null);
