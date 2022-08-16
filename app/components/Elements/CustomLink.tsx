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
        `flex justify-center rounded-full w-full focus:ring-2 focus:ring-custom-blue dark:focus:ring-custom-indigo focus:text-custom-blue dark:focus:text-custom-indigo outline-none transition-all`,
        isActive &&
          'ring-2 ring-custom-blue dark:ring-custom-indigo text-custom-blue dark:text-custom-indigo ring-inset',
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
