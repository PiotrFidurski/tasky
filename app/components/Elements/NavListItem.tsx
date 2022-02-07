import { NavLink } from 'remix';

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & { to: string };

function NavListItem({ children, to, ...props }: ListItemProps) {
  return (
    <li
      className="font-bold w-full"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={
              isActive
                ? 'flex items-center gap-2 px-2 py-2 border bg-blue-600 rounded-md text-white'
                : 'flex items-center gap-2 px-2 py-2 border rounded-md text-slate-600 shadow-md'
            }
          >
            {children}
          </div>
        )}
      </NavLink>
    </li>
  );
}
export { NavListItem };
