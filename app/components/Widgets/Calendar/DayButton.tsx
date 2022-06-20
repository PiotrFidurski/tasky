import clsx from 'clsx';
import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { useNavigate } from 'remix';

import { Button } from '~/components/Elements/Button';

import { DATE_FORMAT } from '~/utils/date';

type DayButtonProps = {
  day: string;
  date: Date;
};

export function DayButton({ day, date }: DayButtonProps) {
  const currentDate = new Date(day);

  const dayOfMonth = format(currentDate, 'dd');

  const navigate = useNavigate();

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
        !isSameMonth(currentDate, date) && 'text-slate-800',
        isBefore(currentDate, new Date()) &&
          isSameMonth(currentDate, date) &&
          !isToday(parseISO(day)) &&
          'text-gray-500',
        isToday(parseISO(day)) && 'text-highlight font-bold'
      )}
    >
      {dayOfMonth}
    </Button>
  );
}
