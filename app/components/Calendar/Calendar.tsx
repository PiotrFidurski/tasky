import { WeekDayNames } from './DayNames';
import { Weeks } from './Weeks';

export default function Calendar({ data }: { data: Array<Array<Date>> }) {
  return (
    <>
      <WeekDayNames />
      <Weeks data={data} />
    </>
  );
}
