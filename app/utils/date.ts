import {
  addDays,
  endOfYear,
  format,
  getISOWeeksInYear,
  isWithinInterval,
  startOfWeek,
  startOfYear,
} from 'date-fns';

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date: Date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

const NUMBER_OF_WEEKS_FOR_YEAR = getISOWeeksInYear(new Date());

const weekRows = new Array(NUMBER_OF_WEEKS_FOR_YEAR + 1).fill(null);

type CalendarDataProps = {
  /**
   * Optional date to start from, defaults to start of the year.
   */
  date?: Date;
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
export function getCalendarData({
  date = startOfYear(new Date()),
  weekStartsOn = 0,
}: CalendarDataProps = {}) {
  let startFromDay = startOfWeek(date, {
    weekStartsOn,
  });

  const calendarMatrix: Array<Array<Date>> = [];

  weekRows.forEach(() => {
    const week: Array<Date> = [];

    weekDayNames.forEach(() => {
      week.push(startFromDay);

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
