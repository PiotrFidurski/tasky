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
            isActive ? 'font-bold' : 'font-normal',
            `flex w-full items-center justify-center lg:justify-start
             p-3 rounded-full hover:bg-custom__hoverlight dark:hover:bg-custom__hoverdark
            focus:bg-custom__hoverlight focus:dark:bg-custom__hoverdark transition-colors`
          )
        }
      >
        {({ isActive }) => (
          <div className="text-custom__gray dark:text-custom__ghostly text-2xl flex items-center gap-6">
            {children({ isActive })}
          </div>
        )}
      </NavLink>
    </li>
  );
}
