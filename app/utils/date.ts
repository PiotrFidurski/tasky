import {
  addDays,
  endOfYear,
  format,
  isBefore,
  isSameMonth,
  isToday,
  isWithinInterval,
  parseISO,
  startOfWeek,
  startOfYear,
} from 'date-fns';

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date: Date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

type CalendarDataProps = {
  /**
   * Date to start calendar from.
   */
  date: Date;
  /**
   * Optional number to start the week on, defaults to 0.
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  /**
   * Optional number of weeks the calendar will have, defaults to 18.
   */
  weeksCount?: number;
};

/**
 * Creates two-dimensional array, where first array consists of arrays for weeks,
 * each week containing Date objects for each day of the week.
 *
 * @returns Two-dimensional Array
 */
export function getCalendarData({
  weekStartsOn = 0,
  date,
  weeksCount = 18,
}: CalendarDataProps) {
  let startingDay = startOfWeek(date, {
    weekStartsOn,
  });

  const weekRows = new Array(weeksCount).fill(null);

  const calendarMatrix: Array<Array<string>> = [];

  weekRows.forEach(() => {
    const week: Array<string> = [];

    weekDayNames.forEach(() => {
      week.push(formatDate(startingDay));

      startingDay = addDays(startingDay, 1);
    });

    calendarMatrix.push(week);
  });

  return calendarMatrix;
}

export function isDayInCurrentYear(day: Date) {
  const start = startOfYear(new Date());
  const end = endOfYear(new Date());

  return isWithinInterval(day, { start, end });
}

export function getCalendarDayHelpers(day: string, date: Date) {
  const currentDate = new Date(day);

  const dayOfMonth = format(currentDate, 'dd');

  const isTodaysDate = isToday(parseISO(day));

  const isDateBeforeToday = isBefore(currentDate, new Date());

  const isInThisMonth = isSameMonth(currentDate, date);

  return { dayOfMonth, isTodaysDate, isDateBeforeToday, isInThisMonth };
}
