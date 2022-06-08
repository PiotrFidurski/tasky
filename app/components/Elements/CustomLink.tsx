import { RemixLinkProps } from '@remix-run/react/components';
import clsx from 'clsx';

import { Link } from 'remix';

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
        `flex justify-center hover:bg-active dark:hover:bg-active_dark
         focus:bg-active dark:focus:bg-active_dark focus:ring-highlight
         focus:ring-2 focus:ring-inset focus:outline-none transition-all`,
        isActive && 'ring-2 ring-highlight text-highlight',
        className
      )}
      {...remixLinkProps}
    >
      {children}
    </Link>
  );
}
