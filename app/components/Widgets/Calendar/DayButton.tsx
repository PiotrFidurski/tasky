import clsx from 'clsx';

import { useNavigate, useParams } from 'remix';

import { formatDate, getCalendarDayHelpers } from '~/utils/date';

type DayButtonProps = {
  day: string;
  date: Date;
};

export function DayButton({ day, date }: DayButtonProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);

  const params = useParams<'day'>();

  const navigate = useNavigate();

  const isActive = day === params.day;

  const handleDayPress = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    navigate(
      `/calendar/${params.day}/create?selectedDate=${e.currentTarget.value}`
    );
  };

  return (
    <button
      value={formatDate(new Date(day))}
      onKeyPress={handleDayPress}
      onClick={handleDayPress}
      type="button"
      className={clsx(
        'rounded-full flex items-center justify-center w-10 h-10 border-0 mb-2 px-1 focus:outline-none focus:ring-2 focus:ring-highlight hover:bg-active dark:hover:bg-active_dark',
        isDateBeforeToday && !isTodaysDate && 'text-gray-500',
        isTodaysDate &&
          !isActive &&
          'ring-2 dark:ring-highlight dark:text-highlight ring-highlightDarker text-highlightDarker',
        !isInThisMonth && 'text-gray-800'
      )}
    >
      {dayOfMonth}
    </button>
  );
}
