const weekDayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function Days() {
  return (
    <div className="grid grid-cols-[repeat(7,minmax(auto,1fr))] sticky top-0 bg-blue-600 mb-2 z-10">
      {weekDayNames.map((dayName) => (
        <span
          key={dayName}
          className="h-[3rem] flex items-center justify-center uppercase font-bold"
        >
          {dayName}
        </span>
      ))}
    </div>
  );
}
