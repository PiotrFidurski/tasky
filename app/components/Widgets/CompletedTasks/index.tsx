import { useFetchers } from 'remix';

import { actionTypes } from '~/server/actions/actionTypes';

import { CircularProgress } from './ProgressCircle';
import { TextContent } from './TextContent';

type Props = {
  total: number;
  completed: number;
  percentage: number;
};

export function CompletedTasks({ completed, total, percentage }: Props) {
  const fetchers = useFetchers();

  const optimisticStats = { completed, total, percentage };

  if (fetchers) {
    fetchers.forEach((fetcher) => {
      if (
        fetcher.submission?.formData.get('_action') ===
        actionTypes.MARK_TASK_COMPLETE
      ) {
        optimisticStats.completed = completed + 1;
        optimisticStats.percentage = Number(
          ((optimisticStats.completed / optimisticStats.total) * 100).toFixed()
        );
      }
      if (
        fetcher.submission?.formData.get('_action') ===
        actionTypes.MARK_TASK_INCOMPLETE
      ) {
        optimisticStats.completed = completed - 1;
        optimisticStats.percentage = Number(
          ((optimisticStats.completed / optimisticStats.total) * 100).toFixed()
        );
      }
    });
  }

  return (
    <div className="w-full max-w-sm mb-4 rounded-2xl bg-light-rgba dark:bg-dark-rgba">
      <div className="flex items-center justify-between w-full p-8">
        <TextContent
          total={optimisticStats.total}
          completed={optimisticStats.completed}
          percentage={optimisticStats.percentage}
        />
        <div className="w-full flex justify-end">
          <CircularProgress
            strokeWidth={10}
            squareSize={125}
            percentage={optimisticStats.percentage}
          />
        </div>
      </div>
    </div>
  );
}
