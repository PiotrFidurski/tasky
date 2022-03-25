import { db } from '~/db/db.server';

export function getManyTasks() {
  return db.task.findMany({ orderBy: { createdAt: 'desc' } });
}

export function getTask(id: string) {
  return db.task.findUnique({ where: { id } });
}

export function getTasksForDay(day: string, userId: string) {
  return db.task.findMany({
    where: { scheduledFor: day, userId },
    orderBy: { sortDate: 'asc' },
  });
}

export function getUnscheduledTasks(userId: string) {
  return db.task.findMany({
    where: { scheduledFor: '', userId },
    orderBy: { sortDate: 'asc' },
  });
}

export function groupTasksByScheduledFor(userId: string) {
  return db.task.groupBy({
    by: ['scheduledFor'],
    _count: { isComplete: true, scheduledFor: true },
    having: {
      scheduledFor: { not: '' },
    },
    where: {
      userId,
    },
  });
}

export function createTask(body: string, userId: string) {
  return db.task.create({
    data: {
      body,
      userId,
    },
  });
}

export function deleteTask(id: string) {
  return db.task.delete({ where: { id } });
}

export function markTaskComplete(id: string) {
  return db.task.update({
    where: { id },
    data: { isComplete: true },
  });
}

export function markTaskIncomplete(id: string) {
  return db.task.update({
    where: { id },
    data: { isComplete: false },
  });
}

export function scheduleTask(id: string, date: string) {
  return db.task.update({
    where: { id },
    data: { scheduledFor: date, sortDate: new Date() },
  });
}

export function unscheduleTask(id: string) {
  return db.task.update({
    where: { id },
    data: { scheduledFor: '', sortDate: new Date() },
  });
}
