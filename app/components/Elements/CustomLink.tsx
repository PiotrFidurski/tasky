import { twMerge } from 'tailwind-merge';

import { Link } from '@remix-run/react';
import { RemixLinkProps } from '@remix-run/react/dist/components';

type CustomLinkProps = RemixLinkProps & {
  to: string;
  isActive?: boolean;
};

export function CustomLink({
  to,
  children,
  className,
  isActive,
  ...remixLinkProps
}: CustomLinkProps) {
  return (
    <Link
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
