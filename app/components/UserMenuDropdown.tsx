import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Form } from 'remix';

import { useUser } from './Auth/useUser';
import { DropdownItem } from './Elements/DropdownItem';
import { useTheme } from './Theme/ThemeProvider';
import { Theme } from './Theme/themeContext';

export function UserMenuDropdown() {
  const { theme, switchTheme } = useTheme();

  const { user } = useUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="open menu"
          type="button"
          className="p-1 rounded-full hover:bg-custom__hoverlight dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray focus:dark:outline-custom__ghostly"
        >
          <img
            src="//unsplash.it/40/40"
            width="50px"
            height="50px"
            alt="user avatar"
            className="rounded-full"
          />
        </button>
      </DropdownMenu.Trigger>
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
          className="rounded-tl-md rounded-tr-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Profile, {user?.username}</span>
        </DropdownItem>
        <DropdownItem aria-label="settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Settings</span>
        </DropdownItem>
        <Form action="/logout" method="post">
          <button type="submit" className="w-full">
            <DropdownItem
              aria-label="logout"
              onSelect={(e) => e.preventDefault()}
            >
              {/* logout icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </DropdownItem>
          </button>
        </Form>
        <DropdownMenu.Label className="text-gray-600 font-semibold text-xs py-4 px-2 dark:text-gray-400">
          <span>Options</span>
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="bg-gray-200 w-full h-px my-2 dark:bg-custom__gray" />
        <button
          type="button"
          className={clsx(
            'flex w-full text-custom__gray dark:text-custom__ghostly'
          )}
          onClick={switchTheme}
        >
          <DropdownItem
            className="w-full rounded-bl-md rounded-br-md"
            aria-label={
              theme === Theme.light
                ? 'switch to dark mode'
                : 'switch to light mode'
            }
            onSelect={(e) => e.preventDefault()}
          >
            {/* toggle theme icon */}
            {theme === Theme.light ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}

            <span>{theme === Theme.light ? 'Dark' : 'Light'}</span>
          </DropdownItem>
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
