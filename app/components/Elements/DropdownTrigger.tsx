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
>(({ className, children, ...triggerProps }, ref) => {
  return (
    <Trigger
      asChild
      ref={ref}
      className={clsx(
        `p-1 dark:text-custom__ghostly rounded-full hover:bg-custom__hoverlight
       dark:hover:bg-custom__hoverdark active:outline-custom__hoverlight 
         focus:outline-2 focus:outline-offset-4 focus:outline-custom__gray
       focus:dark:outline-custom__ghostly`,
        className
      )}
      {...triggerProps}
    >
      {children}
    </Trigger>
  );
});
