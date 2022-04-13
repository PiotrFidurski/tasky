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
            isActive ? 'bg-[#1b2539]' : '',
            'p-3 flex w-full items-center text-custom__gray dark:text-custom__ghostly hover:bg-[#1b2539]  dark:hover:text-white'
          )
        }
      >
        {({ isActive }) => (
          <div className="flex items-center gap-2">
            {children({ isActive })}
          </div>
        )}
      </NavLink>
    </li>
  );
}
