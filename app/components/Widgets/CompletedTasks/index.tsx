import { CustomLink } from '~/components/Elements/CustomLink';

import { CircularProgress } from './ProgressCircle';

type CompletedTasksProps = {
  total: number;
  completed: number;
  percentage: number;
};

export function CompletedTasks({
  completed,
  total,
  percentage,
}: CompletedTasksProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl dark:bg-slate-900 bg-light text-darkGray dark:text-lightGray z-10">
      <div
        style={{ boxShadow: '0px 1px 0px 0px #20283c' }}
        className="flex items-center justify-between w-full p-8"
      >
        <div className="w-full">
          <p className="font-extrabold text-xl mb-2">
            Great, your progress is almost done!
          </p>
          <span className="font-semibold text-sm">
            {completed} out of {total} completed
          </span>
        </div>
        <div className="w-full flex justify-end">
          <CircularProgress
            strokeWidth={10}
            squareSize={125}
            percentage={percentage}
          />
        </div>
      </div>
      <CustomLink
        className="rounded-b-2xl bg-[#26327636] p-2 flex justify-center font-bold"
        to="/"
      >
        View more
      </CustomLink>
    </div>
  );
}
