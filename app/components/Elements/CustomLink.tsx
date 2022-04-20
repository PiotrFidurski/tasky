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
        'flex justify-center hover:bg-[#1b2539] focus:bg-[#1b2539] focus:ring-pink-200 focus:ring-2 focus:ring-inset focus:outline-none transition-all',
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
