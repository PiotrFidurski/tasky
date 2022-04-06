import { CalendarIcon } from '../Icons/CalendarIcon';
import { HomeIcon } from '../Icons/HomeIcon';

export function MobileNav() {
  return (
    <nav className="bg-indigo-200">
      <ul className="flex justify-between items-center px-4">
        <li className="px-2 py-4 w-full flex justify-center">
          <HomeIcon isFilled />
        </li>
        <li className="px-2 py-4 w-full flex justify-center">
          <CalendarIcon isFilled />
        </li>
        <li className="px-2 py-4 w-full flex justify-center">
          <HomeIcon isFilled={false} />
        </li>
        <li className="px-2 py-4 w-full flex justify-center">
          <CalendarIcon isFilled={false} />
        </li>
      </ul>
    </nav>
  );
}
