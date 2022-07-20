import clsx from 'clsx';

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
      className={clsx(
        `flex justify-center rounded-full w-full focus:ring-2 focus:ring-highlight dark:focus:ring-highlight focus:text-highlight outline-none transition-all`,
        isActive && 'ring-highlight text-highlight ring-inset',
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
