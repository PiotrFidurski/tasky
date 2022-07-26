import { Task, User } from '@prisma/client';

export type JsonResponseShape<Model, T extends keyof Model> = Omit<Model, T> &
  Record<T, string>;

export type JsonifiedUser = JsonResponseShape<User, 'createdAt' | 'updatedAt'>;

export type JsonifiedTask = JsonResponseShape<
  Task,
  'createdAt' | 'updatedAt' | 'sortDate'
>;
