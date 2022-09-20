import { twMerge } from 'tailwind-merge';

import { useEffect, useState } from 'react';

import { useActionTransition } from '~/utils/hooks/useActionTransition';

import { Button } from '../Elements/Button';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { Menu } from './Menu';

export default function MobileSidebar() {
  const [expanded, setExpanded] = useState(false);

  const { isSubmitting } = useActionTransition();

  const handleOpenMenu = () => {
    setExpanded(true);
    document.body.style.position = 'fixed';
    document.body.style.inset = '0';
  };

  const handleCloseMenu = () => {
    setExpanded(false);
    document.body.style.position = 'unset';
  };

  useEffect(() => {
    return function cleanup() {
      if (!isSubmitting) {
        handleCloseMenu();
      }
    };
  }, []);

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
          `text-lg flex flex-col fixed inset-0 min-h-screen overflow-hidden max-w-full z-50 bg-primary dark:bg-secondary transition-all`,
          expanded ? 'translate-x-0 visible' : 'translate-x-[-100%] invisible'
        )}
      >
        <Menu visible={expanded} onHandleClose={handleCloseMenu} />
      </div>
    </div>
  );
}
