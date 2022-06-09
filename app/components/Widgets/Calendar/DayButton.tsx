import clsx from 'clsx';

import { useNavigate, useParams } from 'remix';

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

  const navigate = useNavigate();

  const isActive = day === params.day;

  const handleClick = (e: any) => {
    navigate(`/calendar/${day}/create?selectedDate=${e.target.value}`);
  };

  return (
    <Button
      isIconWrapper
      value={formatDate(new Date(day))}
      onClick={handleClick}
      className={clsx(
        'w-10 h-10 mb-2 justify-center',
        isDateBeforeToday && !isTodaysDate && '',
        !isInThisMonth && '',
        isTodaysDate && !isActive && 'ring-2 ring-highlight text-highlight'
      )}
    >
      {dayOfMonth}
    </Button>
  );
}
