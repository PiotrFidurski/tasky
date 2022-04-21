import clsx from 'clsx';
import { useState } from 'react';

import { Menu } from './Menu';
import { OpenMenuButton } from './OpenMenuButton';

export function MobileSidebar() {
  const [show, setShow] = useState(false);

  const handleOpenMenu = () => {
    setShow(true);
  };

  const handleCloseMenu = () => {
    setShow(false);
  };

  return (
    <div className="relative w-full h-screen md:hidden">
      <OpenMenuButton show={show} onHandleOpen={handleOpenMenu} />
      {show ? (
        <div
          className="absolute inset-0 bg-gray-100 opacity-10"
          onClick={handleCloseMenu}
          role="none"
        />
      ) : null}
      <div
        className={clsx(
          `flex flex-col justify-between fixed top-0 left-0 bottom-0 max-w-[60%]
           z-50 bg-gray-900 w-full h-full py-4 border-r border-r-gray-800 transition-all`,
          show ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <Menu visible={show} onHandleClose={handleCloseMenu} />
      </div>
    </div>
  );
}
