import {
  addDays,
  format,
  isBefore,
  isMatch,
  isSameMonth,
  isToday,
  isValid,
  parseISO,
  startOfWeek,
} from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

// todo: delete this junk
export function getCalendarDayHelpers(day: string, date: Date) {
  const currentDate = new Date(day);

  const dayOfMonth = format(currentDate, 'dd');

  const isTodaysDate = isToday(parseISO(day));

  const isDateBeforeToday = isBefore(currentDate, new Date());

  const isInThisMonth = isSameMonth(currentDate, date);

  return { dayOfMonth, isTodaysDate, isDateBeforeToday, isInThisMonth };
}

// todo: remove this use format in components, import DATE_FORMAT only
// or rename to something better
export function formatDate(date: Date = new Date()) {
  return format(date, DATE_FORMAT);
}

export function isValidDateFormat(date: string) {
  return isValid(new Date(date)) && isMatch(date, DATE_FORMAT);
}

type CalendarDataProps = {
  /**
   * Date to start calendar from.
   */
  date: Date;
  /**
   * Optional number to start the week on, defaults to 0.
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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

    [1, 2, 3, 4, 5, 6, 7].forEach(() => {
      week.push(formatDate(startingDay));

      startingDay = addDays(startingDay, 1);
    });

    calendarMatrix.push(week);
  });

  return calendarMatrix;
}
