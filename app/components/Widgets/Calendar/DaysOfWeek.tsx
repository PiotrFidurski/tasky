import { DAYS_OF_WEEK } from './consts';

export function DaysOfWeek() {
  return (
    <section className="flex justify-between mb-2">
      {DAYS_OF_WEEK.map((day) => (
        <span
          key={day}
          className="w-10 h-10 font-bold flex justify-center items-center"
        >
          {day}
        </span>
      ))}
    </section>
  );
}
