import { Form, LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/session/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = getUser({ request });

  return user;
};

export default function HomeRoute() {
  const user = useLoaderData();

  return (
    <div>
      welcome {user.username}
      <Form action="/logout" method="post">
        <button type="submit">logout</button>
      </Form>
    </div>
  );
}
