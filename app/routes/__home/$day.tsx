import nProgress from 'nprogress';

import { useEffect } from 'react';

import { format } from 'date-fns';

import {
  Outlet,
  useCatch,
  useLoaderData,
  useNavigate,
  useTransition,
} from '@remix-run/react';

import { action } from '~/server/actions/task.server';
import { DayLoader, loader } from '~/server/loaders/$day.server';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { DayLink } from '~/components/Widgets/Calendar/components/DayLink';
import { CompletedTasks } from '~/components/Widgets/CompletedTasks';
import { Task } from '~/components/Widgets/Task';

import { DATE_FORMAT } from '~/utils/date';
import { useInfiniteLoader } from '~/utils/hooks/useInfiniteLoader';

export { loader };

export { action };

export default function DayRoute() {
  const { completed, percentage, total, stats, tasks } =
    useLoaderData<DayLoader>();
  const transition = useTransition();
  const { tasksData, setElement, Form } = useInfiniteLoader();

  useEffect(() => {
    if (
      transition.state === 'idle' ||
      transition.location?.pathname === '/logout' ||
      transition.location?.pathname === '/login'
    )
      nProgress.done();
    else nProgress.start();
  }, [transition.location?.pathname, transition.state]);

  return (
    <>
      <div className="lg:sticky top-2 h-max">
        <Calendar startingDate={new Date()} stats={stats}>
          {({ day, date }) => (
            <DayLink stats={stats} day={day} key={day} date={date} />
          )}
        </Calendar>
        <CompletedTasks
          total={total}
          completed={completed}
          percentage={percentage}
        />
        <Outlet />
      </div>
      <div>
        {tasks.concat(tasksData).map((task) => (
          <div ref={setElement} key={task.id} data-id={task.id}>
            <Task key={task.id} task={task} />
          </div>
        ))}
      </div>
      {tasks.length > 0 ? <Form method="post" /> : null}
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const navigate = useNavigate();

  return (
    <div className="mt-12 p-4 bg-red-400 rounded-md">
      <div className="flex items-center mb-4">
        <Button
          className="w-auto"
          onClick={() => navigate(`/${format(new Date(), DATE_FORMAT)}`)}
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
