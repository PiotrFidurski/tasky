import { User } from '@prisma/client';
import { Form, json, LoaderFunction, redirect, useLoaderData } from 'remix';
import { db } from '~/db/db.server';
import { getUserSession } from '~/session/session.server';
import { badRequest } from '~/utils/badRequest';

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession({
    request,
  });

  if (!session.has('userId')) {
    return redirect('/login');
  }

  const user = await db.user.findFirst({
    where: { id: session.data.userId },
  });

  if (!user) {
    return badRequest('Something went wrong getting user information.');
  }

  const data: LoaderData = {
    user,
  };

  return json(data, { status: 200 });
};

export default function HomeRoute() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div>
      welcome {user.username}
      <Form action="/logout" method="post">
        <button type="submit">logout</button>
      </Form>
    </div>
  );
}
