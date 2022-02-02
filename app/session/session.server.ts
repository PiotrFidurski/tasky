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
 * Creates user session.
 *
 * @param userId - unique user identifier.
 * @returns `Promise<Response>` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export async function createUserSession(userId: string) {
  const session = await sessionStorage.getSession();

  session.set('userId', userId);

  return redirect('/home', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

/**
 * Parses Cookie header.
 *
 * @param request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request.
 * @returns `Promise<Session>`
 */
export function getUserSession({ request }: { request: Request }) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

/**
 * Destroys user session.
 *
 * @param request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request.
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
