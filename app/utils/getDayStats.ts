export type GroupedTask = {
  scheduledFor: string;
  _count: { isComplete: number; scheduledFor: number };
};

export function getDayStats(data: Array<GroupedTask>, date: string) {
  let statusRecord: Record<string, Array<number>> = {};

  data.forEach((day) => {
    statusRecord = {
      ...statusRecord,
      // eslint-disable-next-line no-underscore-dangle
      [day.scheduledFor]: [day._count.scheduledFor, day._count.isComplete],
    };
  });

  if (statusRecord[date]) {
    return statusRecord[date];
  }

  return [];
}
