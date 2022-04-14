import clsx from 'clsx';
import { useState } from 'react';

import { Button } from '../Elements/Button';
import { NavListItem } from '../Elements/NavListItem';
import { CalendarIcon } from '../Icons/CalendarIcon';
import { CloseIcon } from '../Icons/CloseIcon';
import { EditIcon } from '../Icons/EditIcon';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { HomeIcon } from '../Icons/HomeIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { UserAvatar } from '../SettingsMenu/UserAvatar';

export function WIPv2Sidebar() {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <div className="relative w-full h-full md:hidden">
      <div className="flex items-center gap-2 p-2 border-b border-gray-700">
        <Button
          isIconWrapper
          className="w-auto"
          onClick={toggleMenu}
          buttonType
          aria-controls="sidebar"
          aria-label="open menu"
          aria-expanded={show}
        >
          <HamburgerIcon />
        </Button>
        <span>Home</span>
      </div>
      <div
        className={clsx(
          'flex flex-col justify-between absolute top-0 left-0 bottom-0 max-w-[60%] z-50 bg-gray-900 w-full h-full py-4 border-r border-r-gray-700 transition-all',
          show ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <nav aria-label="sidebar" id="sidebar">
          <div className="flex items-center p-4">
            <h2 className="w-full">Menu</h2>
            <div className="flex justify-end">
              <Button
                isIconWrapper
                onClick={toggleMenu}
                buttonType
                aria-controls="sidebar"
                aria-label="close menu"
                aria-expanded={show}
              >
                <CloseIcon />
              </Button>
            </div>
          </div>
          <div className="p-4 flex mb-4">
            <UserAvatar width={40} height={40} />
          </div>
          <div className="">
            <ul className="flex flex-col">
              <NavListItem to="/home">
                {({ isActive }) => (
                  <>
                    <HomeIcon isFilled={isActive} />
                    <span>Home</span>
                  </>
                )}
              </NavListItem>
              <NavListItem to="/calendar">
                {({ isActive }) => (
                  <>
                    <CalendarIcon isFilled={isActive} />
                    <span>Calendar</span>
                  </>
                )}
              </NavListItem>
              <NavListItem to="/calendar">
                {({ isActive }) => (
                  <>
                    <EditIcon isFilled={isActive} />
                    <span>Tasks</span>
                  </>
                )}
              </NavListItem>
            </ul>
          </div>
        </nav>
        <Button isMenuItem className="flex justify-between p-3">
          <span>Create Task</span>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
