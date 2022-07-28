import clsx from 'clsx';

import { useState } from 'react';

import { Menu } from './Menu';
import { Menuv2 } from './Menuv2';
import { OpenMenuButton } from './OpenMenuButton';

export function MobileSidebar() {
  const [expanded, setExpanded] = useState(true);

  const handleOpenMenu = () => {
    setExpanded(true);
  };

  const handleCloseMenu = () => {
    setExpanded(false);
  };

  return (
    <div className="relative w-full md:hidden">
      <div className="p-2">
        <OpenMenuButton show={expanded} onHandleOpen={handleOpenMenu} />
      </div>
      {expanded ? (
        <div
          className="fixed inset-0 bg-gray-100 opacity-10"
          onClick={handleCloseMenu}
          role="none"
        />
      ) : null}
      <div
        className={clsx(
          `font-semibold text-lg flex flex-col justify-between fixed top-0 
          left-0 bottom-0 max-w-full z-50 bg-primary dark:bg-secondary w-full
          h-full py-4 transition-all`,
          expanded ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <Menuv2 visible={expanded} onHandleClose={handleCloseMenu} />
      </div>
    </div>
  );
}
