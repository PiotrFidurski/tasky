import { RemixLinkProps } from '@remix-run/react/components';
import clsx from 'clsx';

import { Link } from 'remix';

type CustomLinkProps = RemixLinkProps & {
  to: string;
};

export function CustomLink({
  to,
  children,
  className,
  ...remixLinkProps
}: CustomLinkProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex justify-center hover:bg-active dark:hover:bg-active_dark focus:bg-active dark:focus:bg-active_dark focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none transition-all',
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
