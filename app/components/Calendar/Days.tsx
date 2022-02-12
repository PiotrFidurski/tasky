import { weekDayNames } from '~/utils/date';

function Days() {
  return (
    <div className="flex sticky top-0 shadow-md">
      {weekDayNames.map((dayName) => (
        <span
          key={dayName}
          className="w-[calc(340px/7)] h-[3rem] flex items-center justify-center uppercase bg-blue-600 text-white font-bold shadow-sm"
        >
          {dayName}
        </span>
      ))}
    </div>
  );
}

export { Days };
