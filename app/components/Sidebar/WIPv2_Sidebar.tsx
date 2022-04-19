import { useState } from 'react';

import { Menu } from './Menu';
import { OpenMenuButton } from './OpenMenuButton';

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
      <OpenMenuButton show={show} onHandleOpen={handleOpenMenu} />
      <Menu show={show} onHandleClose={handleCloseMenu} />
    </div>
  );
}
