import {
  DropdownMenuTriggerProps,
  Trigger,
} from '@radix-ui/react-dropdown-menu';

import { forwardRef } from 'react';

type DropdownTriggerProps = DropdownMenuTriggerProps &
  React.RefAttributes<HTMLButtonElement>;

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, children, ...dropdownTriggerProps }, ref) => (
  <Trigger
    asChild
    ref={ref}
    className="p-1 rounded-full focus:outline-2 focus:outline-offset-4"
    {...dropdownTriggerProps}
  >
    {children}
  </Trigger>
));
