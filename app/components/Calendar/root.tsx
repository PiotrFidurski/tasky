import { Days } from './Days';
import { Weeks } from './Weeks';

export default function Calendar({
  data,
  stats,
}: {
  data: Array<Array<string>>;
  stats: Record<string, number[]>;
}) {
  return (
    <>
      <Days />
      <Weeks data={data} stats={stats} />
    </>
  );
}
