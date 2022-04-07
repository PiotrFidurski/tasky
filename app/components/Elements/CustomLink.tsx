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
        `text-custom__gray dark:text-custom__ghostly uppercase
       hover:bg-custom__gray hover:text-custom__ghostly 
       font-bold dark:hover:bg-custom__ghostly dark:hover:text-custom__gray transition-colors
       focus:outline-dashed outline-offset-2 outline-2 outline-custom__gray dark:outline-custom__ghostly`,
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
