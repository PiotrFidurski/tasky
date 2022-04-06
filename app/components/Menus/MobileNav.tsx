import { NavListItem } from '~/components/Elements/NavListItem';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { HomeIcon } from '~/components/Icons/HomeIcon';

export function MobileNav() {
  return (
    <nav className="bg-indigo-800">
      <ul className="flex justify-between items-center px-4 py-2">
        <NavListItem to="/home" className="flex justify-center">
          {({ isActive }) => <HomeIcon isFilled={isActive} />}
        </NavListItem>
        <NavListItem to="/calendar" className="flex justify-center">
          {({ isActive }) => <CalendarIcon isFilled={isActive} />}
        </NavListItem>
        <NavListItem to="/home" className="flex justify-center">
          {({ isActive }) => <HomeIcon isFilled={isActive} />}
        </NavListItem>
        <NavListItem to="/calendar" className="flex justify-center">
          {({ isActive }) => <CalendarIcon isFilled={isActive} />}
        </NavListItem>
      </ul>
    </nav>
  );
}
