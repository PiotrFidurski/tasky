import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { useUser } from '~/components/Auth/useUser';
import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { ProfileIcon } from '~/components/Icons/ProfileIcon';
import { SettingsIcon } from '~/components/Icons/SettingsIcon';
import { useTheme } from '~/components/Theme/ThemeProvider';
import { Theme } from '~/components/Theme/themeContext';

import { LogoutForm } from './LogoutForm';
import { ToggleThemeButton } from './ToggleThemeButton';
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
        sideOffset={isMobile ? 20 : 0}
        alignOffset={isMobile ? -14 : 0}
        loop
        className={clsx(
          'rounded-lg border bg-white dark:bg-dark transition-colors',
          isMobile ? 'min-w-[calc(100vw-17px)]' : 'min-w-[14rem]'
        )}
      >
        {!isMobile ? (
          <DropdownMenu.Arrow className="fill-white" offset={20} />
        ) : null}
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
        <DropdownMenu.Label className="font-semibold text-xs py-4 px-2  ">
          <span>Options</span>
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="bg-gray-200 w-full h-px my-2" />
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
