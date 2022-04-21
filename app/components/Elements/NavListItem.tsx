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
            `p-3 flex w-full items-center hover:bg-[#1b2539] focus:ring-pink-200 focus:ring-2 
             focus:ring-inset focus:outline-none focus:bg-[#1b2539] transition-all`
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
