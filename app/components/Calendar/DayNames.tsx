import { weekDayNames } from '~/utils/date';

function WeekDayNames() {
  return (
    <div className="flex sticky top-0 shadow-md">
      {weekDayNames.map((week) => (
        <span
          key={week}
          className="w-[calc(340px/7)] h-[3rem] flex items-center justify-center uppercase bg-blue-600 text-white font-bold shadow-sm"
        >
          {week}
        </span>
      ))}
    </div>
  );
}

export { WeekDayNames };
