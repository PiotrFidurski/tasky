import { CircularProgress } from './ProgressCircle';
import { TextContent } from './TextContent';

type Props = {
  total: number;
  completed: number;
  percentage: number;
};

export function CompletedTasks({ completed, total, percentage }: Props) {
  return (
    <div className="w-full max-w-sm mb-4 rounded-2xl bg-light-rgba dark:bg-dark-rgba">
      <div className="flex items-center justify-between w-full p-8">
        <TextContent
          total={total}
          completed={completed}
          percentage={percentage}
        />
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
