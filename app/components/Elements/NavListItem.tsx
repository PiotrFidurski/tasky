import clsx from 'clsx';

import { NavLink } from 'remix';

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
            isActive && 'bg-active dark:bg-active_dark',
            `p-3 flex w-full items-center hover:bg-active dark:hover:bg-active_dark
             focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none 
             focus:bg-active dark:focus:bg-active_dark transition-all`
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
