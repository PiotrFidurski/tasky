const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function Days() {
  return (
    <div className="flex justify-between mb-4">
      {DAYS.map((day) => (
        <span
          key={day}
          className="w-10 h-10 flex justify-center items-center text-gray-300"
        >
          {day}
        </span>
      ))}
    </div>
  );
}
