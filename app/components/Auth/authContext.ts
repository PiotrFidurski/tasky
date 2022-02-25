import { User } from '@prisma/client';
import { createContext } from 'react';

export const authContext = createContext<User | null>(null);
