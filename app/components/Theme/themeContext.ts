import React from 'react';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

type ContextProps = {
  theme: Theme | null;
  handleSwitchTheme: () => void;
};

export const themeContext = React.createContext<ContextProps | null>(null);
