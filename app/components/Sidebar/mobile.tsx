import { twMerge } from 'tailwind-merge';

import { useState } from 'react';

import { Button } from '../Elements/Button';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { Menu } from './Menu';

export function MobileSidebar() {
  const [expanded, setExpanded] = useState(true);

  const handleOpenMenu = () => {
    setExpanded(true);
    document.body.style.position = 'fixed';
  };

  const handleCloseMenu = () => {
    setExpanded(false);
    document.body.style.position = 'unset';
  };

  return (
    <div className="md:hidden">
      <div className="p-2">
        <Button
          className="border-transparent dark:border-transparent"
          onClick={handleOpenMenu}
          aria-controls="sidebar"
          aria-label="open sidebar"
          aria-expanded={expanded}
        >
          <HamburgerIcon />
        </Button>
      </div>
      <div
        className={twMerge(
          `text-lg flex flex-col fixed inset-0 overflow-hidden max-w-full z-50 bg-primary dark:bg-secondary transition-all`,
          expanded ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <Menu visible={expanded} onHandleClose={handleCloseMenu} />
      </div>
    </div>
  );
}
