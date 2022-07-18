import { createContext } from 'react';
import { JsonifiedUser } from '~/types';

export const authContext = createContext<{ user: JsonifiedUser | null } | null>(
  null
);
