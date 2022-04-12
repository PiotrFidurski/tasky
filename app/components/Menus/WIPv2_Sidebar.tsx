import clsx from 'clsx';
import { useState } from 'react';

import { Button } from '../Elements/Button';
import { NavListItem } from '../Elements/NavListItem';
import { CalendarIcon } from '../Icons/CalendarIcon';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { HomeIcon } from '../Icons/HomeIcon';

export function WIPv2Sidebar() {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 max-w-[60%] w-full h-auto z-50">
      <Button className="fixed w-auto p-2 z-50" onClick={toggleMenu} buttonType>
        <HamburgerIcon />
      </Button>
      <nav
        className={clsx(
          'bg-gray-900 w-full h-full border-r border-r-gray-700 p-2 transition-all',
          show ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <div className="pt-10">
          <ul className="flex flex-col gap-2">
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
          </ul>
        </div>
      </nav>
    </div>
  );
}
