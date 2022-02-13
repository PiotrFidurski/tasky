import {
  addDays,
  endOfYear,
  format,
  isWithinInterval,
  startOfWeek,
  startOfYear,
} from 'date-fns';

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date: Date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

const WEEKS_COUNT = 18;

const weekRows = new Array(WEEKS_COUNT).fill(null);

type CalendarDataProps = {
  /**
   * Date to start calendar from.
   */
  date: Date;
  /**
   * Optional number to start the week on, defaults to 0.
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
};

/**
 * Creates two-dimensional array, where first array consists of arrays for weeks,
 * each week containing Date objects for each day of the week.
 *
 * @returns Two-dimensional Array
 */
export function getCalendarData({ weekStartsOn = 0, date }: CalendarDataProps) {
  let startFromDay = startOfWeek(date, {
    weekStartsOn,
  });

  const calendarMatrix: Array<Array<string>> = [];

  weekRows.forEach(() => {
    const week: Array<string> = [];

    weekDayNames.forEach(() => {
      week.push(formatDate(startFromDay));

      startFromDay = addDays(startFromDay, 1);
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
