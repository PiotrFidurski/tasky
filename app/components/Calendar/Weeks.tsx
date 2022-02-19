import clsx from 'clsx';

import { Day } from '~/components/Calendar/Day';

function Weeks({ data }: { data: Array<Array<string>> }) {
  const isFirstRow = (index: number) => index === 0;
  const isLastRow = (index: number) => data.length - 1 !== index;

  return (
    <div>
      {data.map((week, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={clsx(
            isFirstRow(index) ? 'border-t dark:border-custom__gray' : null,
            isLastRow(index) ? 'border-b dark:border-custom__gray' : null,
            'grid grid-cols-[repeat(7,minmax(auto,1fr))]'
          )}
        >
          {week.map((day) => (
            <Day day={day} key={day} />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Weeks };
