import React from 'react';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

type ContextProps = {
  theme: Theme | null;
  switchTheme: () => void;
};

export const themeContext = React.createContext<ContextProps | null>(null);
