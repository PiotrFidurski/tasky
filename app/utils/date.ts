import { addDays, format, isMatch, isValid, startOfWeek } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

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

function getStartOfWeek(
  date: Date,
  weekStartsOn: CalendarDataProps['weekStartsOn']
) {
  return startOfWeek(date, {
    weekStartsOn,
  });
}

function getWeekRows(weeksCount: CalendarDataProps['weeksCount']) {
  return new Array(weeksCount).fill(null);
}

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
  let startingDate = getStartOfWeek(date, weekStartsOn);
  console.log('getting calendar data');
  const weekRows = getWeekRows(weeksCount);

  const calendarData: Array<Array<string>> = [];

  weekRows.forEach(() => {
    const week: Array<string> = [];

    [1, 2, 3, 4, 5, 6, 7].forEach(() => {
      week.push(format(startingDate, DATE_FORMAT));

      startingDate = addDays(startingDate, 1);
    });

    calendarData.push(week);
  });

  return calendarData;
}
