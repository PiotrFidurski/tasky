import { createCookieSessionStorage, json } from 'remix';

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in your environment variables.');
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'user_preferences',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export function getUserPreferencesSession(request: Request) {
  return themeStorage.getSession(request.headers.get('Cookie'));
}

export async function updateThemeSession(request: Request, theme: string) {
  const session = await getUserPreferencesSession(request);

  session.set('theme', theme);

  return json(
    { success: true },
    {
      status: 200,
      headers: { 'Set-Cookie': await themeStorage.commitSession(session) },
    }
  );
}
