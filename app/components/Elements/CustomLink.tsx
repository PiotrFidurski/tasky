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
        'border flex justify-center rounded-full border-indigo-500 text-custom__ghostly bg-indigo-600 hover:bg-indigo-700 transition-all',
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
