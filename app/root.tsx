import { User } from '@prisma/client';
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
  useCatch,
  useLoaderData,
} from 'remix';

import { AuthProvider } from './components/Auth/AuthProvider';
import { ThemeProvider, useTheme } from './components/Theme/ThemeProvider';
import { LoadUserThemePreferences } from './components/Theme/systemTheme';
import { Theme } from './components/Theme/themeContext';
import { getUserById } from './models/user';
import { getUserSession } from './session/session.server';
import { getThemeSession } from './session/theme.server';
import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'Tasky' };
};

type LoaderData = {
  theme: Theme;
  user: User | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);

  const userId = session.get('userId');

  try {
    const user = await getUserById(userId);

    const themeSession = await getThemeSession(request);

    const data: LoaderData = {
      theme: themeSession.get('theme'),
      user,
    };

    return data;
  } catch (error) {
    return error;
  }
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
      <body className="bg-white dark:bg-custom__bluedark h-screen">
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
    <AuthProvider user={data.user}>
      <ThemeProvider storedTheme={data.theme}>
        <Document>
          <Outlet />
        </Document>
      </ThemeProvider>
    </AuthProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="dark:text-custom__ghostly text-custom__gray">
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <p>Status: {caught.statusText}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
