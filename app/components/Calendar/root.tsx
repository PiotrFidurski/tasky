import { GroupedTask } from '~/utils/getDayStats';

import { Days } from './Days';
import { Weeks } from './Weeks';

export default function Calendar({
  data,
  groupedTasks,
}: {
  data: Array<Array<string>>;
  groupedTasks: Array<GroupedTask>;
}) {
  return (
    <>
      <Days />
      <Weeks data={data} groupedTasks={groupedTasks} />
    </>
  );
}
