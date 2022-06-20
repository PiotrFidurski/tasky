import clsx from 'clsx';
import { format, isBefore, isSameMonth, isToday, parseISO } from 'date-fns';

import { useParams } from 'remix';

import { CustomLink } from '~/components/Elements/CustomLink';

type DayProps = {
  day: string;
  date: Date;
  stats: { [key: string]: number[] };
};

export function Day({ day, date, stats }: DayProps) {
  const currentDate = new Date(day);

  const dayOfMonth = format(currentDate, 'dd');

  const params = useParams<'day'>();

  const [total, complete] = stats[day] ?? [];

  const isActive = day === params.day;

  return (
    <CustomLink
      isActive={isActive}
      to={`/${day}`}
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-full mb-2 text-s font-bold relative',
        isToday(parseISO(day)) &&
          !isActive &&
          'ring-2 ring-highlight text-highlight',
        isBefore(currentDate, new Date()) && !isToday(parseISO(day)) && '',
        !isSameMonth(currentDate, date) && ''
      )}
    >
      {dayOfMonth}
      {total !== complete ? (
        <span className="absolute top-4 text-2xl">·</span>
      ) : null}
      {total && total === complete ? (
        <span className="absolute top-4 text-pink-600 text-2xl">·</span>
      ) : null}
    </CustomLink>
  );
}
