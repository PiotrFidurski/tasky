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
    <div className="w-full max-w-sm rounded-2xl dark:bg-slate-900 bg-light z-10">
      <div
        style={{ boxShadow: '0px 1px 0px 0px #20283c' }}
        className="flex items-center justify-between w-full p-8"
      >
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
        className="rounded-t-none rounded-b-xl dark:bg-shadowHighlight bg-[#e7e7e7] p-2 font-bold"
        to="/"
      >
        View more
      </CustomLink>
    </div>
  );
}
