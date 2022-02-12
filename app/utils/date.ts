import {
  addDays,
  format,
  getISOWeeksInYear,
  startOfWeek,
  startOfYear,
} from 'date-fns';

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date: Date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

const NUMBER_OF_WEEKS_FOR_YEAR = getISOWeeksInYear(new Date());

const weekRows = new Array(NUMBER_OF_WEEKS_FOR_YEAR + 1).fill(null);

type Props = {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  date?: Date;
};

export function getCalendarData({
  weekStartsOn = 0,
  date = startOfYear(new Date()),
}: Props = {}) {
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
