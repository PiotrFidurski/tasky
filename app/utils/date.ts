import { addDays, format, getISOWeeksInYear, startOfWeek } from 'date-fns';

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatDate(date: Date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

const NUMBER_OF_WEEKS_FOR_YEAR = getISOWeeksInYear(new Date());
const START_OF_WEEK = startOfWeek(new Date(), { weekStartsOn: 0 });

const weekRows = new Array(NUMBER_OF_WEEKS_FOR_YEAR + 1).fill(null);

export function createCalendar() {
  const calendarMatrix: Array<Array<Date>> = [];

  let currentDay = START_OF_WEEK;

  weekRows.forEach(() => {
    const week: Array<Date> = [];

    weekDayNames.forEach(() => {
      week.push(currentDay);

      currentDay = addDays(currentDay, 1);
    });

    calendarMatrix.push(week);
  });

  return calendarMatrix;
}
