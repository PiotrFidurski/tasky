import { db } from '~/db/db.server';

export function getManyTasks() {
  return db.task.findMany({ orderBy: { createdAt: 'desc' } });
}

export function getTask(id: string) {
  return db.task.findUnique({ where: { id } });
}

export function getTasksForDay(day: string) {
  return db.task.findMany({ where: { scheduledFor: day } });
}

export function getUnscheduledTasks() {
  return db.task.findMany({ where: { scheduledFor: '' } });
}

export function createTask(body: string, userId: string) {
  return db.task.create({
    data: {
      body,
      userId,
    },
  });
}

export function markTaskComplete(id: string) {
  return db.task.update({
    where: { id },
    data: { isComplete: true },
  });
}

export function markTaskUncomplete(id: string) {
  return db.task.update({
    where: { id },
    data: { isComplete: false },
  });
}

export function scheduleTask(id: string, date: string) {
  return db.task.update({
    where: { id },
    data: { scheduledFor: date },
  });
}

export function unscheduleTask(id: string) {
  return db.task.update({
    where: { id },
    data: { scheduledFor: '' },
  });
}
