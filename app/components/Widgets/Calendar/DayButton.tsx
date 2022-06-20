import clsx from 'clsx';
import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { useNavigate, useParams } from 'remix';

import { Button } from '~/components/Elements/Button';

import { DATE_FORMAT } from '~/utils/date';

type DayButtonProps = {
  day: string;
  date: Date;
};

export function DayButton({ day, date }: DayButtonProps) {
  const currentDate = new Date(day);

  const dayOfMonth = format(currentDate, 'dd');

  const params = useParams<'day'>();

  const navigate = useNavigate();

  const isActive = day === params.day;

  const handleClick = (e: any) => {
    navigate(`/calendar/${day}/create?selectedDate=${e.target.value}`);
  };

  return (
    <Button
      isIconWrapper
      value={format(new Date(day), DATE_FORMAT)}
      onClick={handleClick}
      className={clsx(
        'w-10 h-10 mb-2 justify-center',
        isBefore(currentDate, new Date()) && !isToday(parseISO(day)) && '',
        !isSameMonth(currentDate, date) && '',
        isToday(parseISO(day)) &&
          !isActive &&
          'ring-2 ring-highlight text-highlight'
      )}
    >
      {dayOfMonth}
    </Button>
  );
}
