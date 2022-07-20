import { DropdownMenuItemProps, Item } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { forwardRef } from 'react';

type DropdownItemProps = DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, children, ...itemProps }, ref) => {
    return (
      <Item
        ref={ref}
        className={clsx(
          `font-semibold cursor-pointer flex items-center gap-4 outline-none dark:focus:bg-shadowHighlight focus:bg-light transition-colors`,
          className
        )}
        {...itemProps}
      >
        {children}
      </Item>
    );
  }
);
