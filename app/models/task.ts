import { db } from '~/db/db.server';

export function getManyTasks() {
  return db.task.findMany();
}

export function getTask(id: string) {
  return db.task.findUnique({ where: { id } });
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
