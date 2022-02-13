import { Days } from './Days';
import { Weeks } from './Weeks';

export default function Calendar({ data }: { data: Array<Array<string>> }) {
  return (
    <>
      <Days />
      <Weeks data={data} />
    </>
  );
}
