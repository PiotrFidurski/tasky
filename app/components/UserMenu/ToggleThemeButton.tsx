import { Button } from '~/components/Elements/Button';
import { MoonIcon } from '~/components/Icons/MoonIcon';
import { SunIcon } from '~/components/Icons/SunIcon';
import { useTheme } from '~/components/Theme/ThemeProvider';
import { Theme } from '~/components/Theme/themeContext';

export function ToggleThemeButton() {
  const { theme } = useTheme();

  return (
    <Button
      type="button"
      className="px-2 py-4 flex items-center gap-4 font-semibold focus:border-none dark:focus:border-none border-transparent dark:border-transparent hover:bg-transparent dark:hover:bg-transparent hover:border-transparent dark:hover:border-transparent"
    >
      {theme === Theme.light ? <MoonIcon /> : <SunIcon />}
      <span>{theme === Theme.light ? 'Dark' : 'Light'}</span>
    </Button>
  );
}
