import clsx from 'clsx';

import { NavLink } from '@remix-run/react';

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  to: string;
  children: ({ isActive }: { isActive: boolean }) => JSX.Element;
};

export function NavListItem({ children, to, ...htmlLiProps }: ListItemProps) {
  return (
    <li {...htmlLiProps}>
      <NavLink
        to={to}
        className={clsx(`py-3 flex w-full font-normal text-light`)}
      >
        {({ isActive }) => (
          <div className="flex items-center gap-4 transition-all">
            {children({ isActive })}
          </div>
        )}
      </NavLink>
    </li>
  );
}
