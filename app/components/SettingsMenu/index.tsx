import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useUser } from '../Auth/useUser';
import { DropdownItem } from '../Elements/DropdownItem';
import { DropdownTrigger } from '../Elements/DropdownTrigger';
import { ProfileIcon } from '../Icons/ProfileIcon';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { useTheme } from '../Theme/ThemeProvider';
import { Theme } from '../Theme/themeContext';
import { LogoutForm } from './LogoutForm';
import { ToggleThemeButton } from './ToggleThemeButton';
import { UserAvatar } from './UserAvatar';

export function UserMenuDropdown() {
  const { theme, switchTheme } = useTheme();

  const { user } = useUser();

  return (
    <DropdownMenu.Root>
      <DropdownTrigger>
        <button aria-label="open menu" type="button">
          <UserAvatar width={40} height={40} />
        </button>
      </DropdownTrigger>
      <DropdownMenu.Content
        loop
        className="rounded-lg min-w-[15rem] border bg-white dark:bg-custom__bluedark transition-colors dark:border-custom__gray"
      >
        <DropdownMenu.Arrow
          className="fill-custom__ghostly dark:fill-custom__gray"
          offset={20}
        />
        <DropdownItem
          aria-label="user profile"
          className="rounded-tl-md rounded-tr-md px-2 py-4"
        >
          <ProfileIcon />
          <span>{user?.username}</span>
        </DropdownItem>
        <DropdownItem aria-label="settings" className="px-2 py-4">
          <SettingsIcon />
          <span>Settings</span>
        </DropdownItem>
        <LogoutForm />
        <DropdownMenu.Label className="text-gray-600 font-semibold text-xs py-4 px-2 dark:text-gray-400">
          <span>Options</span>
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="bg-gray-200 w-full h-px my-2 dark:bg-custom__gray" />
        <DropdownItem
          className="w-full rounded-bl-md rounded-br-md"
          onClick={switchTheme}
          aria-label={
            theme === Theme.light
              ? 'switch to dark mode'
              : 'switch to light mode'
          }
          onSelect={(e) => e.preventDefault()}
        >
          <ToggleThemeButton />
        </DropdownItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
