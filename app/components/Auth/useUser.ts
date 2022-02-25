import { useContext } from 'react';

import { authContext } from './authContext';

export function useUser() {
  const context = useContext(authContext);

  if (!context) {
    console.warn('You are using authContext outside of AuthProvider.');
  }

  return context;
}
