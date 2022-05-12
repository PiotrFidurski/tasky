const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function DayNames() {
  return (
    <section className="flex justify-between mb-2">
      {DAYS.map((day) => (
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
