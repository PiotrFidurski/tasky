type TaskStats = {
  scheduledFor: string;
  _count: { isComplete: number; scheduledFor: number };
};

export function getTaskStatsForEachDay(data: Array<TaskStats>) {
  return data.reduce<Record<string, number[]>>((acc, value) => {
    // eslint-disable-next-line no-param-reassign
    acc = {
      ...acc,
      [value.scheduledFor]: [
        value._count.scheduledFor,
        value._count.isComplete,
      ],
    };

    return acc;
  }, {});
}

export function getTotalAndCompletedTasksCount(data: Array<TaskStats>) {
  return data.reduce(
    (acc, value) => {
      acc.total += value._count.scheduledFor;
      acc.completed += value._count.isComplete;

      return acc;
    },
    { total: 0, completed: 0 }
  );
}
