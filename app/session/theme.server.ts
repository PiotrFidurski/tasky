import { createCookieSessionStorage, json } from 'remix';

import { Theme } from '~/components/Theme/themeContext';

if (!process.env.THEME_SECRET) {
  throw new Error('THEME_SECRET must be set in your environment variables.');
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'user_preferences',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.THEME_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export function getThemeSession(request: Request) {
  return themeStorage.getSession(request.headers.get('Cookie'));
}

export async function updateThemeSession(request: Request, theme: Theme) {
  const session = await getThemeSession(request);

  session.set('theme', theme);

  return json(
    { success: true },
    {
      status: 200,
      headers: { 'Set-Cookie': await themeStorage.commitSession(session) },
    }
  );
}
