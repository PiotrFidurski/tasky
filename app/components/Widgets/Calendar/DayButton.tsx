import clsx from 'clsx';

import { useNavigate, useParams, useSearchParams } from 'remix';

import { Button } from '~/components/Elements/Button';

import { formatDate, getCalendarDayHelpers } from '~/utils/date';

type DayButtonProps = {
  day: string;
  date: Date;
};

export function DayButton({ day, date }: DayButtonProps) {
  const { isTodaysDate, dayOfMonth, isDateBeforeToday, isInThisMonth } =
    getCalendarDayHelpers(day, date);

  const params = useParams<'day'>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const isActive = day === params.day;

  const handleDayPress = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    navigate(
      `/calendar/${params.day}/create?title=${
        searchParams.get('title') ?? ''
      }&body=${searchParams.get('body') ?? ''}&selectedDate=${
        e.currentTarget.value
      }`
    );
  };

  return (
    <Button
      isIconWrapper
      value={formatDate(new Date(day))}
      onKeyPress={handleDayPress}
      onClick={handleDayPress}
      type="button"
      className={clsx(
        'w-10 h-10 mb-2 justify-center',
        isDateBeforeToday && !isTodaysDate && 'dark:text-gray-500',
        !isInThisMonth && 'dark:text-gray-800',
        isTodaysDate &&
          !isActive &&
          'ring-2 dark:ring-highlight dark:text-highlight ring-highlightDarker text-highlightDarker'
      )}
    >
      {dayOfMonth}
    </Button>
  );
}
