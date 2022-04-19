import { useState } from 'react';

import { Button } from '../Elements/Button';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { Menu } from './Menu';

export function WIPv2Sidebar() {
  const [show, setShow] = useState(false);

  const handleOpenMenu = () => {
    setShow(true);
  };

  const handleCloseMenu = () => {
    setShow(false);
  };

  return (
    <div className="relative w-full h-full md:hidden">
      <div className="flex items-center gap-2 p-2 border-b border-gray-700">
        <Button
          isIconWrapper
          className="w-auto"
          onClick={handleOpenMenu}
          buttonType
          aria-controls="sidebar"
          aria-label="open menu"
          aria-expanded={show}
        >
          <HamburgerIcon />
        </Button>
        <span>Home</span>
      </div>
      <Menu show={show} onHandleClose={handleCloseMenu} />
    </div>
  );
}
