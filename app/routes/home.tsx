import { LoaderFunction, useLoaderData } from 'remix';
import { authenticator } from '~/session/auth.server';

export const loader: LoaderFunction = async ({
  request,
}) => {
  const user = await authenticator.isAuthenticated(
    request,
    {
      failureRedirect: '/login',
    }
  );

  return user;
};

export default function HomeRoute() {
  const user = useLoaderData();

  return <div>welcome {user.username}</div>;
}
