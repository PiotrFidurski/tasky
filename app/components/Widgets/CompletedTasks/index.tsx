import { CircularProgress } from './ProgressCircle';

export function CompletedTasks() {
  return (
    <div className="w-full border-2 border-highlight rounded-2xl p-8 dark:bg-slate-900 bg-light text-darkGray dark:text-lightGray">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <p className="font-extrabold text-xl mb-2">
            Great, your progress is almost done!
          </p>
          <span className="font-semibold text-sm">4 of 7 completed</span>
        </div>
        <div className="w-full flex justify-end">
          <CircularProgress strokeWidth={10} squareSize={125} percentage={25} />
        </div>
      </div>
    </div>
  );
}
