import { CustomLink } from '~/components/Elements/CustomLink';

import { CircularProgress } from './ProgressCircle';
import { TextContent } from './TextContent';

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
    <div className="w-full max-w-sm rounded-2xl shadow-md z-10 dark:shadow-slate-900">
      <div className="flex items-center justify-between w-full p-8 shadow-[0px_1px_0px_0px] shadow-shadowHighlight">
        <TextContent total={total} completed={completed} />
        <div className="w-full flex justify-end">
          <CircularProgress
            strokeWidth={10}
            squareSize={125}
            percentage={percentage}
          />
        </div>
      </div>
      <CustomLink
        className="rounded-t-none rounded-b-xl dark:bg-shadowHighlight bg-greyLight p-2 font-bold"
        to="/"
      >
        View more
      </CustomLink>
    </div>
  );
}
