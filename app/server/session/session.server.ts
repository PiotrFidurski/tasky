import { z } from 'zod';

import { createCookieSessionStorage, redirect } from 'remix';

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in your environment variables.');
}

export const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function createUserSession(userId: string) {
  const session = await userSessionStorage.getSession();

  session.set('userId', userId);

  return redirect('/', {
    headers: {
      'Set-Cookie': await userSessionStorage.commitSession(session),
    },
  });
}

/**
 * Parses Cookie header.
 *
 * @param request - Request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request.
 * @returns `Promise<Session>`
 */
export function getUserSession(request: Request) {
  return userSessionStorage.getSession(request.headers.get('Cookie'));
}

export async function getAuthUserId(request: Request) {
  const session = await userSessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const userId = z.string().parse(session.get('userId'));

  return userId;
}

export async function destroyUserSession(request: Request) {
  const session = await getUserSession(request);

  return redirect('/login', {
    headers: {
      'Set-Cookie': await userSessionStorage.destroySession(session),
    },
  });
}
