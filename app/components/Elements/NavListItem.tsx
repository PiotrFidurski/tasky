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
        className="flex w-full items-center hover:bg-[#1b2539] p-1 rounded-md"
      >
        {({ isActive }) => (
          <div className="text-custom__gray dark:text-custom__ghostly flex items-center gap-2">
            {children({ isActive })}
          </div>
        )}
      </NavLink>
    </li>
  );
}
