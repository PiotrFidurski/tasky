import { ActionFunction, LoaderFunction, redirect } from 'remix';

import { updateThemeSession } from '~/session/theme.server';

import { isValidTheme } from '~/components/Theme/ThemeProvider';

import { badRequest } from '~/utils/badRequest';

export const action: ActionFunction = async ({ request }) => {
  try {
    const bodyText = await request.text();
    const searchParams = new URLSearchParams(bodyText);
    const theme = searchParams.get('theme');

    if (!isValidTheme(theme)) {
      throw badRequest('theme has to be a valid string.');
    }

    return await updateThemeSession(request, theme);
  } catch (error) {
    return error;
  }
};

export const loader: LoaderFunction = async () => {
  return redirect('/', { status: 404 });
};
