import { useContext, useEffect, useRef, useState } from 'react';

import { useFetcher } from '@remix-run/react';

import { getSystemTheme } from './systemTheme';
import { Theme, themeContext } from './themeContext';

type ThemeProviderProps = {
  children: React.ReactNode;
  storedTheme: Theme;
};

export function isValidTheme(value: unknown): value is Theme {
  return (
    typeof value === 'string' && (value === Theme.dark || value === Theme.light)
  );
}

export function ThemeProvider({ children, storedTheme }: ThemeProviderProps) {
  const updateTheme = useFetcher();
  const isMountedRef = useRef(false);

  const [theme, setTheme] = useState(() => {
    if (storedTheme && isValidTheme(storedTheme)) {
      return storedTheme;
    }

    if (typeof window === 'undefined') {
      return null;
    }

    return getSystemTheme();
  });

  function switchTheme() {
    if (theme === Theme.light) {
      return setTheme(Theme.dark);
    }

    return setTheme(Theme.light);
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (!theme) {
      return;
    }

    if (theme) {
      updateTheme.submit(
        { theme },
        {
          method: 'post',
          action: '/preferences',
        }
      );
    }
  }, [theme]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <themeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(themeContext);

  if (!theme)
    throw new Error(`useTheme hook must be used within ThemeProvider
    , check if the component you're using the hook in is wrapped in a ThemeProvider.`);

  return theme;
}
