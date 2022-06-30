export type GroupedTask = {
  scheduledFor: string;
  _count: { isComplete: number; scheduledFor: number };
};

export function getDayStats(data: Array<GroupedTask>) {
  let stats: { [key: string]: Array<number> } = {};

  data.forEach((day) => {
    stats = {
      ...stats,
      [day.scheduledFor]: [day._count.scheduledFor, day._count.isComplete],
    };
  });

  return stats;
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
