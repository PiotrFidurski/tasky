import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

import { Link } from '@remix-run/react';
import { RemixLinkProps } from '@remix-run/react/dist/components';

type CustomLinkProps = RemixLinkProps & {
  to: string;
  isActive?: boolean;
};

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ to, children, className, isActive, ...remixLinkProps }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={twMerge(
          `outline-none border-2 rounded-full p-3 text-secondary dark:text-primary
        border-custom-blue dark:border-custom-indigo focus:border-secondary
        dark:focus:border-primary dark:hover:border-primary
        focus:bg-light-rgba dark:focus:bg-dark-rgba hover:border-secondary
        hover:bg-light-rgba dark:hover:bg-dark-rgba transition-colors`,
          className
        )}
        {...remixLinkProps}
      >
        {children}
      </Link>
    );
  }
);
