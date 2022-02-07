import clsx from 'clsx';

import { NavLink } from 'remix';

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & { to: string };

function NavListItem({ children, to, ...htmlLiProps }: ListItemProps) {
  return (
    <li className="font-bold w-full" {...htmlLiProps}>
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={clsx(
              'flex items-center gap-2 px-2 py-2 border rounded-md shadow-sm',
              isActive ? 'bg-blue-600 text-white' : 'text-slate-600'
            )}
          >
            {children}
          </div>
        )}
      </NavLink>
    </li>
  );
}
export { NavListItem };
