import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { ProfileIcon } from '~/components/Icons/ProfileIcon';
import { SettingsIcon } from '~/components/Icons/SettingsIcon';
import { useTheme } from '~/components/Theme/ThemeProvider';
import { Theme } from '~/components/Theme/themeContext';

import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedUser } from '~/types';

import { DropdownContent } from '../Elements/DropdownContent';
import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';
import { Avatar } from './Avatar';
import { LogoutForm } from './LogoutForm';

export function UserMenu() {
  const { theme, switchTheme } = useTheme();

  const data = useRouteData<{ user: JsonifiedUser }>('root');

  return (
    <DropdownMenu.Root>
      <DropdownTrigger>
        <Button className="w-auto" aria-label="open menu" type="button">
          <Avatar width={40} height={40} />
        </Button>
      </DropdownTrigger>
      <DropdownContent loop sideOffset={10} alignOffset={0}>
        <DropdownItem aria-label="user profile" isFirstItem>
          <ProfileIcon />
          <span>{data?.user?.username}</span>
        </DropdownItem>
        <DropdownItem aria-label="settings">
          <SettingsIcon />
          <span>Settings</span>
        </DropdownItem>
        <LogoutForm />
        <DropdownMenu.Label className="text-xs py-4 px-2">
          <span>Options</span>
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="bg-gray-200 dark:bg-[#202852] w-full h-px my-2" />
        <DropdownItem
          role="button"
          isLastItem
          onClick={switchTheme}
          aria-label={
            theme === Theme.light
              ? 'switch to dark mode'
              : 'switch to light mode'
          }
        >
          {theme === Theme.light ? <MoonIcon /> : <SunIcon />}
          <span>{theme === Theme.light ? 'Dark' : 'Light'}</span>
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu.Root>
  );
}
