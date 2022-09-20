import {
  Content,
  DropdownMenuContentProps,
} from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

type DropdownContentProps = DropdownMenuContentProps &
  React.RefAttributes<HTMLDivElement>;

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, ...dropdownContentProps }, ref) => (
    <Content
      ref={ref}
      className={twMerge(
        `rounded-lg min-w-full w-full dark:bg-secondary bg-primary
         shadow-custom-light dark:shadow-custom-dark`,

        className
      )}
      {...dropdownContentProps}
    >
      {children}
    </Content>
  )
);
