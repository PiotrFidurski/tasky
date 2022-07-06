export type GroupedTask = {
  scheduledFor: string;
  _count: { isComplete: number; scheduledFor: number };
};
// [day.scheduledFor]: [day._count.scheduledFor, day._count.isComplete],

export function getTaskStatsForEachDay(data: Array<GroupedTask>) {
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

export function getTotalTasksCount(data: Array<GroupedTask>) {
  return data.reduce(
    (acc, value) => {
      acc.total += value._count.scheduledFor;
      acc.completed += value._count.isComplete;

      return acc;
    },
    { total: 0, completed: 0 }
  );
}
