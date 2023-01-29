import { twMerge } from 'tailwind-merge';

import React from 'react';

import { LoaderArgs } from 'remix';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';

import { getUserById } from '~/server/models/user';
import { getUserSession } from '~/server/session/session.server';
import { getThemeSession } from '~/server/session/theme.server';

import { ThemeProvider, useTheme } from '~/components/Theme/ThemeProvider';
import { LoadUserThemePreferences } from '~/components/Theme/systemTheme';

import styles from '~/styles/app.css';

import { isMobile } from './utils/isMobile';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Montserrat/Montserrat-Medium.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Montserrat/Montserrat-Medium.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
  ];
}

export function meta() {
  return { title: 'Tasky' };
}

export async function loader({ request }: LoaderArgs) {
  const [userSession, themeSession] = await Promise.all([
    getUserSession(request),
    getThemeSession(request),
  ]);

  const theme = themeSession.get('theme');

  const clonedRequest = request.clone();

  const mobile = isMobile(clonedRequest.headers.get('user-agent'));

  if (userSession.has('userId')) {
    const userId = userSession.get('userId');

    const user = await getUserById(userId);

    const data = {
      theme,
      user,
      isMobile: mobile,
    };

    return data;
  }

  const data = {
    theme,
    user: null,
    isMobile: mobile,
  };

  return data;
}

function Document({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en" className={twMerge(theme)} data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <LoadUserThemePreferences ssrTheme={Boolean(data.theme)} />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary dark:bg-secondary dark:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider storedTheme={data.theme}>
      <Document>
        <Outlet />
      </Document>
    </ThemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <p>Status: {caught.statusText}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
