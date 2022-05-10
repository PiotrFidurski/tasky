import { groupTasksByScheduledFor } from '~/models/task';
import { requireUserId } from '~/session/auth.server';

import {
  LoaderFunction,
  Outlet,
  useCatch,
  useLoaderData,
  useNavigate,
} from 'remix';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';

import { formatDate } from '~/utils/date';
import { getDayStats } from '~/utils/getDayStats';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const groupedTasks = await groupTasksByScheduledFor(userId);

  const stats = getDayStats(groupedTasks);

  return stats;
};

export default function IndexRoute() {
  const stats = useLoaderData<{ [key: string]: number[] }>();

  return (
    <div>
      <Calendar startingDate={new Date()} stats={stats} />
      <Outlet />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const navigate = useNavigate();

  return (
    <div className="dark:text-custom__ghostly text-custom__gray mt-12 p-4 bg-red-400 rounded-md">
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
