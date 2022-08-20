import { DropdownMenuItemProps, Item } from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

type DropdownItemProps = DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, children, ...dropdownItemProps }, ref) => {
    return (
      <Item
        ref={ref}
        className={twMerge(
          `font-semibold cursor-pointer px-2 py-4 flex items-center gap-4 outline-none dark:focus:bg-shadowHighlight focus:bg-light transition-colors`,
          className
        )}
        {...dropdownItemProps}
      >
        {children}
      </Item>
    );
  }
);
