import { Theme } from './themeContext';

export const prefersLightMQ = '(prefers-color-scheme: light)';

export const getSystemTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Theme.light : Theme.dark;

const userThemePreferences = `
// this piece of code will run before document body is rendered
// essentially blocking rendering until user preferences are loaded on the server.
;(() => {
    const preferredTheme = window.matchMedia(${JSON.stringify(
      prefersLightMQ
    )}).matches
    ? 'light'
    : 'dark';
    
    const htmlClassList = document.documentElement.classList;
 
    const isThemeSet = htmlClassList.contains('light') || htmlClassList.contains('dark');

    if(isThemeSet) {
        console.warn("Something went wrong, you shouldn't be seeing this.")
    }
    
    htmlClassList.add(preferredTheme)
})();
`;

export function LoadUserThemePreferences({ ssrTheme }: { ssrTheme: boolean }) {
  return ssrTheme ? null : (
    // eslint-disable-next-line react/no-danger
    <script dangerouslySetInnerHTML={{ __html: userThemePreferences }} />
  );
}
