import clsx from 'clsx';
import React from 'react';

import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';

import { ThemeProvider, useTheme } from './components/Theme/ThemeProvider';
import { LoadUserThemePreferences } from './components/Theme/systemTheme';
import { Theme } from './components/Theme/themeContext';
import { getUserPreferencesSession } from './session/theme.server';
import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'Tasky' };
};

type LoaderData = {
  theme: Theme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getUserPreferencesSession(request);

  const data: LoaderData = {
    theme: themeSession.get('theme'),
  };

  return data;
};

function Document({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <LoadUserThemePreferences ssrTheme={Boolean(data.theme)} />
        <Meta />
        <Links />
      </head>
      <body className="dark bg-white dark:bg-black dark:text-slate-200">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider storedTheme={data.theme}>
      <Document>
        <Outlet />
      </Document>
    </ThemeProvider>
  );
}
