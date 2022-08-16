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
    <div className="w-full max-w-sm rounded-2xl z-10 bg-light-rgba dark:bg-dark-rgba">
      <div className="flex items-center justify-between w-full p-8">
        <TextContent total={total} completed={completed} />
        <div className="w-full flex justify-end">
          <CircularProgress
            strokeWidth={10}
            squareSize={125}
            percentage={percentage}
          />
        </div>
      </div>
    </div>
  );
}
