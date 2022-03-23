import { DropdownMenuItemProps, Item } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { forwardRef } from 'react';

type DropdownItemProps = DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, children, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={clsx(
          `text-custom__gray font-semibold flex items-center gap-4
           outline-none focus:bg-custom__hoverlight fill-custom__gray
           dark:text-custom__ghostly focus:dark:bg-custom__hoverdark dark:fill-custom__ghostly`,
          className
        )}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children}
      </Item>
    );
  }
);
