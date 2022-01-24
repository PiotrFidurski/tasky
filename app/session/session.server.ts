import { createCookieSessionStorage } from 'remix';

const SECRET_KEY = process.env.SESSION_SECRET;

if (!SECRET_KEY) {
  throw new Error('Please set SESSION_SECRET env variable');
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
