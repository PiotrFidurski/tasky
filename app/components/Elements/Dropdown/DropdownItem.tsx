import { DropdownMenuItemProps, Item } from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

type DropdownItemProps = DropdownMenuItemProps & {
  isLastItem?: boolean;
  isFirstItem?: boolean;
} & React.RefAttributes<HTMLDivElement>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    { className, children, isLastItem, isFirstItem, ...dropdownItemProps },
    ref
  ) => (
    <Item
      ref={ref}
      className={twMerge(
        `text-secondary dark:text-primary 
         cursor-pointer px-2 py-4 flex items-center gap-4
         outline-none focus:bg-[rgba(0,0,0,0.03)] dark:focus:bg-[rgba(255,255,255,0.05)]`,
        isFirstItem && 'rounded-tl-md rounded-tr-md',
        isLastItem && 'rounded-bl-md rounded-br-md',
        className
      )}
      {...dropdownItemProps}
    >
      {children}
    </Item>
  )
);
