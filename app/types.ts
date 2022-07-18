import { Task, User } from '@prisma/client';

export type UserResponse<T extends keyof User> = Omit<User, T> &
  Record<T, string>;

export type TaskResponse<T extends keyof Task> = Omit<Task, T> &
  Record<T, string>;

export type JsonifiedUser = UserResponse<'createdAt' | 'updatedAt'>;

export type JsonifiedTask = TaskResponse<
  'createdAt' | 'updatedAt' | 'sortDate'
>;
