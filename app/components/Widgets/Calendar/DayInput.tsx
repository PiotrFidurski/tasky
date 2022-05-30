import clsx from 'clsx';

import { useNavigate, useParams } from 'remix';

import { formatDate, getCalendarDayHelpers } from '~/utils/date';

type DayInputProps = {
  day: string;
  date: Date;
};

export function DayInput({ day, date }: DayInputProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);

  const params = useParams<'day'>();

  const navigate = useNavigate();

  const isActive = day === params.day;

  const handleDayPress = (
    e:
      | React.MouseEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    navigate(
      `/calendar/${params.day}/create?selectedDate=${e.currentTarget.value}`
    );
  };

  return (
    <div
      className={clsx(
        'relative focus-within:ring-2 focus-within:ring-highlight rounded-full w-10 h-10 mb-2 px-1 flex items-center',
        isTodaysDate &&
          !isActive &&
          'ring-2 dark:ring-highlight dark:text-highlight ring-highlightDarker text-highlightDarker'
      )}
    >
      <input
        onClick={handleDayPress}
        onKeyPress={handleDayPress}
        className="overflow-hidden bg-transparent focus-visible:text-fill-transparent text-center z-10 text-transparent focus:text-transparent select-none focus:selection:text-transparent"
        defaultValue={formatDate(new Date(day))}
      />
      <div
        className={clsx(
          'absolute inset-0 rounded-full flex items-center justify-center bg-slate-900',
          isDateBeforeToday && !isTodaysDate && 'text-gray-500',
          !isInThisMonth && 'text-gray-800'
        )}
      >
        {dayOfMonth}
      </div>
    </div>
  );
}
