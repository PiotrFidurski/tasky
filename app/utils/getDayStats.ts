export type GroupedTask = {
  scheduledFor: string;
  _count: { isComplete: number; scheduledFor: number };
};

export function getDayStats(data: Array<GroupedTask>) {
  let statusRecord: Record<string, Array<number>> = {};

  data.forEach((day) => {
    statusRecord = {
      ...statusRecord,
      [day.scheduledFor]: [day._count.scheduledFor, day._count.isComplete],
    };
  });

  return statusRecord;
}
