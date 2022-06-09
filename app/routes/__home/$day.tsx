import { groupTasksByScheduledFor } from '~/models/task';
import { requireUserId } from '~/session/auth.server';

import {
  LoaderFunction,
  Outlet,
  json,
  useCatch,
  useLoaderData,
  useNavigate,
} from 'remix';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { Day } from '~/components/Widgets/Calendar/Day';
import { CompletedTasks } from '~/components/Widgets/CompletedTasks';

import { formatDate } from '~/utils/date';
import { getDayStats, getTotalTasksCount } from '~/utils/getStats';

type LoaderData = {
  total: number;
  completed: number;
  percentage: number;
  stats: { [key: string]: number[] };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const { completed, total } = getTotalTasksCount(groupedTasks);

  const percentage = ((completed / total) * 100).toFixed();

  const stats = getDayStats(groupedTasks);

  const data: LoaderData = {
    stats,
    completed,
    total,
    percentage: !Number.isNaN(Number(percentage)) ? Number(percentage) : 0,
  };

  return json(data, { status: 200 });
};

export default function DayRoute() {
  const { completed, percentage, total, stats } = useLoaderData<LoaderData>();

  return (
    <div>
      <Calendar startingDate={new Date()} stats={stats}>
        {({ day, date }) => (
          <Day stats={stats} day={day} key={day} date={date} />
        )}
      </Calendar>
      <CompletedTasks
        total={total}
        completed={completed}
        percentage={percentage}
      />
      <Outlet />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const navigate = useNavigate();

  return (
    <div className="mt-12 p-4 bg-red-400 rounded-md">
      <div className="flex items-center mb-4">
        <Button
          isIconWrapper
          className="w-auto"
          onClick={() => navigate(`/${formatDate(new Date())}`)}
        >
          <ArrowleftIcon />
        </Button>
        <div className="w-full grid place-content-center text-center">
          <p>{caught.status}</p>
          <p>{caught.statusText}</p>
        </div>
      </div>
      <details>
        <code className="break-words whitespace-normal">{caught.data}</code>
      </details>
    </div>
  );
}
