import { User } from '@prisma/client';
import { createContext } from 'react';

export const authContext = createContext<{ user: User | null } | null>(null);
