import {
  DropdownMenuTriggerProps,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { forwardRef } from 'react';

type DropdownTriggerProps = DropdownMenuTriggerProps &
  React.RefAttributes<HTMLButtonElement>;

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, children, ...dropdownTriggerProps }, ref) => {
  return (
    <Trigger
      asChild
      ref={ref}
      className={clsx(
        `p-1 rounded-full
         focus:outline-2 focus:outline-offset-4`,
        className
      )}
      {...dropdownTriggerProps}
    >
      {children}
    </Trigger>
  );
});
