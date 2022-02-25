import { User } from '@prisma/client';

import { authContext } from './authContext';

type ProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

export function AuthProvider({ children, user }: ProviderProps) {
  // for now we return entire user object but maybe we can get away with just user.id
  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}
