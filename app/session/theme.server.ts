import { createCookieSessionStorage, json } from 'remix';

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'user_preferences',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['verySecretKey'],
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
