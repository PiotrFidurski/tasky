import { Days } from './Days';
import { Weeks } from './Weeks';

export default function Calendar({ data }: { data: Array<Array<Date>> }) {
  return (
    <>
      <Days />
      <Weeks data={data} />
    </>
  );
}
