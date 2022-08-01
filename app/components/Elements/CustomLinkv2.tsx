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
    border-buttonColor dark:border-borderAndIcons
     focus:border-secondary dark:focus:border-light 
     focus:bg-light-rgba dark:focus:bg-dark-rgba
     hover:border-secondary dark:hover:border-light 
     hover:bg-light-rgba dark:hover:bg-dark-rgba
     transition-colors`,
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
