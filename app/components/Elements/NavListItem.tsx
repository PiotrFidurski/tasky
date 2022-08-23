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
        className={`py-3 outline-none flex font-normal px-2
         focus:text-custom-blue dark:focus:text-custom-indigo
           underline-offset-2 focus:underline hover:text-custom-blue
         dark:hover:text-custom-indigo hover:underline`}
      >
        {({ isActive }) => (
          <div className="flex items-center gap-4">
            {children({ isActive })}
          </div>
        )}
      </NavLink>
    </li>
  );
}
