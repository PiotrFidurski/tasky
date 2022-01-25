import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from 'remix';
import { sessionStorage } from '~/session/session.server';

export const action: ActionFunction = async ({
  request,
}) => {
  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );

  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(
        session
      ),
    },
  });
};

export const loader: LoaderFunction = () => {
  return redirect('/home');
};
