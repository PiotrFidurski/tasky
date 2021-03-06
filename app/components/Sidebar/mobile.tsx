import clsx from 'clsx';
import { useState } from 'react';

import { Menu } from './Menu';
import { OpenMenuButton } from './OpenMenuButton';

export function MobileSidebar() {
  const [expanded, setExpanded] = useState(false);

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
          left-0 bottom-0 max-w-[60%] z-50 bg-light dark:bg-dark w-full
          h-full py-4 transition-all`,
          expanded ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <Menu visible={expanded} onHandleClose={handleCloseMenu} />
      </div>
    </div>
  );
}
