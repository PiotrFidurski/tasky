import clsx from 'clsx';
import { useState } from 'react';

import { Button } from '../Elements/Button';
import { HamburgerIcon } from '../Icons/HamburgerIcon';

export function WIPv2Sidebar() {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <div className="absolute left-0 right-0">
      <div className="w-full p-2 border-b border-gray-200 min-h-[3rem] bg-gray-900 flex items-center">
        <Button
          className="fixed w-auto p-2 z-50"
          onClick={toggleMenu}
          buttonType
        >
          <HamburgerIcon />
        </Button>
      </div>

      <nav
        className={clsx(
          'bg-gray-900 w-full h-full border-r border-gray-800 p-2 transition-transform',
          show ? 'translate-x-0' : 'translate-x-[-100%]'
        )}
      >
        <div className="pt-6">
          <div>
            <span>hello</span>
          </div>
          <div>
            <span>hello</span>
          </div>
          <div>
            <span>hello</span>
          </div>
          <div>
            <span>hello</span>
          </div>
          <div>
            <span>hello</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
