import { useParams } from 'remix';

import { NavListItem } from '~/components/Elements/NavListItem';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { HomeIcon } from '~/components/Icons/HomeIcon';

import { formatDate } from '~/utils/date';

import { CustomLink } from '../Elements/CustomLink';
import { PlusIcon } from '../Icons/PlusIcon';

export function MobileNav() {
  const { day } = useParams<'day'>();

  const dayParam = !day ? formatDate() : day;
  return (
    <nav className="bg-indigo-800 rounded-tl-[4rem] rounded-tr-[4rem]">
      {/* clip path this */}
      <div className="z-[100] absolute right-[calc(50%-2rem)] top-[-2rem] h-[4rem] w-[4rem] bg-black rounded-full shadow-md shadow-indigo-100">
        <CustomLink
          to={`/calendar/${dayParam}/create`}
          className="absolute inset-0 lg:justify-between p-4 rounded-full"
        >
          <PlusIcon />
        </CustomLink>
      </div>
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
