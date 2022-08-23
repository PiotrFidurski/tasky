import { twMerge } from 'tailwind-merge';

import { useState } from 'react';

import { Menuv2 } from './Menu';
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
      <div
        className={twMerge(
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
