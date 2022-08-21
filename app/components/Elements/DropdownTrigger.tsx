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
  <Trigger asChild ref={ref} {...dropdownTriggerProps}>
    {children}
  </Trigger>
));
