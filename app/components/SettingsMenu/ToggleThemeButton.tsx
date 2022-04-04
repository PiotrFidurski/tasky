import { Button } from '../Elements/Button';
import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';
import { useTheme } from '../Theme/ThemeProvider';
import { Theme } from '../Theme/themeContext';

export function ToggleThemeButton() {
  const { theme } = useTheme();

  return (
    <Button type="button" className="px-2 py-4 font-semibold">
      {theme === Theme.light ? <MoonIcon /> : <SunIcon />}
      <span>{theme === Theme.light ? 'Dark' : 'Light'}</span>
    </Button>
  );
}
