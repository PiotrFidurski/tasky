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
