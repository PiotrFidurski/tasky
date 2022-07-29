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
        className={`py-3 outline-none flex w-full font-normal text-secondary dark:text-primary px-2 
        focus:text-buttonColor dark:focus:text-borderAndIcons underline-offset-2 focus:underline
        `}
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
