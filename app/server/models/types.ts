import { Task } from '@prisma/client';

export type CreateTaskProps = Pick<Task, 'body' | 'userId' | 'scheduledFor'>;
