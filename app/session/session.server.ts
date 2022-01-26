import { User } from '@prisma/client';
import { createCookieSessionStorage, redirect } from 'remix';

const SECRET_KEY = process.env.SESSION_SECRET;

if (!SECRET_KEY) {
  throw new Error('SESSION_SECRET must be set in your environment variables.');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [SECRET_KEY],
    secure: process.env.NODE_ENV === 'production',
  },
});

/**
 * Creates user session and redirects to homepage.
 *
 * @param {User} user - User model.
 * @returns `Promise<Response>` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export async function createUserSession({ user }: { user: User }) {
  const session = await sessionStorage.getSession();

  session.set('userId', user?.id);

  return redirect('/home', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

/**
 * Parses Cookie header and returns session promise.
 *
 * @param {Request} request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request.
 * @returns `Promise<Session>`
 */
export function getUserSession({ request }: { request: Request }) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

/**
 * Destroys user session and redirects to login page.
 *
 * @param {Request} request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request.
 * @returns `Promise<Response>` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export async function destroyUserSession({ request }: { request: Request }) {
  const session = await getUserSession({ request });

  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
