import { Day } from '~/components/Calendar/Day';

function Weeks({ data }: { data: Array<Array<string>> }) {
  return (
    <div className="shadow-md">
      {data.map((week, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="flex flex-wrap">
          {week.map((day) => (
            <Day day={day} key={day} />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Weeks };
