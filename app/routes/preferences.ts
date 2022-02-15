import { updateThemeSession } from '~/session/theme.server';

import { ActionFunction, LoaderFunction, redirect } from 'remix';

import { isValidTheme } from '~/components/Theme/ThemeProvider';

export const action: ActionFunction = async ({ request }) => {
  try {
    const requestBody = await request.text();
    const searchParams = new URLSearchParams(requestBody);
    const themeParam = searchParams.get('theme');

    if (!isValidTheme(themeParam)) {
      return null;
    }

    return await updateThemeSession(request, themeParam);
  } catch (error) {
    return error;
  }
};

export const loader: LoaderFunction = async () => {
  return redirect('/', { status: 404 });
};
