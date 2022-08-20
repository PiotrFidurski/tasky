import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useUser } from '~/components/Auth/useUser';
import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { ProfileIcon } from '~/components/Icons/ProfileIcon';
import { SettingsIcon } from '~/components/Icons/SettingsIcon';
import { useTheme } from '~/components/Theme/ThemeProvider';
import { Theme } from '~/components/Theme/themeContext';

import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';
import { LogoutForm } from './LogoutForm';
import { UserAvatar } from './UserAvatar';

type UserMenuProps = {
  isMobile?: boolean;
};

export function UserMenu({ isMobile }: UserMenuProps) {
  const { theme, switchTheme } = useTheme();

  const { user } = useUser();

  return (
    <DropdownMenu.Root modal={!isMobile}>
      <DropdownTrigger>
        <Button className="w-auto" aria-label="open menu" type="button">
          <UserAvatar width={40} height={40} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu.Content
        loop
        sideOffset={10}
        alignOffset={0}
        className="rounded-lg min-w-[14rem] dark:bg-secondary bg-primary shadow-custom-light dark:shadow-custom-dark"
      >
        <DropdownItem
          aria-label="user profile"
          className="rounded-tl-md rounded-tr-md px-2 py-4"
        >
          <ProfileIcon />
          <span>{user?.username}</span>
        </DropdownItem>
        <DropdownItem aria-label="settings">
          <SettingsIcon />
          <span>Settings</span>
        </DropdownItem>
        <LogoutForm />
        <DropdownMenu.Label className="font-semibold text-xs py-4 px-2">
          <span>Options</span>
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="bg-gray-200 dark:bg-slate-800 w-full h-px my-2" />
        <DropdownItem
          className=" rounded-bl-md rounded-br-md"
          onClick={switchTheme}
          aria-label={
            theme === Theme.light
              ? 'switch to dark mode'
              : 'switch to light mode'
          }
          onSelect={(e) => e.preventDefault()}
        >
          {theme === Theme.light ? <MoonIcon /> : <SunIcon />}
          <span>{theme === Theme.light ? 'Dark' : 'Light'}</span>
        </DropdownItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
