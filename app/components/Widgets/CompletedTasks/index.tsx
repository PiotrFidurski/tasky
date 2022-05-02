import { CircularProgress } from './ProgressCircle';

type CompletedTasksProps = {
  total: number;
  completed: number;
};

export function CompletedTasks({ completed, total }: CompletedTasksProps) {
  const percentage = (completed / total) * 100;
  return (
    <div className="w-full border-2 border-highlight rounded-2xl p-8 dark:bg-slate-900 bg-light text-darkGray dark:text-lightGray">
      <div className="flex items-center justify-between">
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
            percentage={Number(percentage.toFixed(0))}
          />
        </div>
      </div>
    </div>
  );
}
