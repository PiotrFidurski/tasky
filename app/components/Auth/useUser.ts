import { useMatches } from 'remix';

export function useUser() {
  const root = useMatches()[0];

  const { user } = root.data;

  return user;
}
