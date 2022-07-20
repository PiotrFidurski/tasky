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
        className={({ isActive }) =>
          clsx(
            isActive && 'bg-active',
            `p-3 flex w-full items-center hover:bg-active
             focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none 
             focus:bg-active transition-all`
          )
        }
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
