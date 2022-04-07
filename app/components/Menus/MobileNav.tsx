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
    <nav className="bg-slate-900">
      {/* clip path this */}
      <div className="z-[100] absolute right-[calc(50%-2rem)] top-[-1rem] h-[4rem] w-[4rem] rounded-full">
        <CustomLink
          to={`/calendar/${dayParam}/create`}
          className="flex items-center justify-center absolute inset-0 p-4 rounded-full border border-slate-800 bg-slate-900"
        >
          <PlusIcon />
        </CustomLink>
      </div>
      <div className="flex w-full justify-between">
        <ul className="flex justify-between items-center px-4 py-1 max-w-[12rem] w-full">
          <NavListItem to="/home" className="flex justify-center">
            {({ isActive }) => <HomeIcon isFilled={isActive} />}
          </NavListItem>
          <NavListItem to="/calendar" className="flex justify-center">
            {({ isActive }) => <CalendarIcon isFilled={isActive} />}
          </NavListItem>
        </ul>
        <ul className="flex items-center justify-between px-4 py-1 max-w-[12rem] w-full">
          <NavListItem to="/home" className="flex justify-center">
            {({ isActive }) => <HomeIcon isFilled={isActive} />}
          </NavListItem>
          <NavListItem to="/calendar" className="flex justify-center">
            {({ isActive }) => <CalendarIcon isFilled={isActive} />}
          </NavListItem>
        </ul>
      </div>
    </nav>
  );
}
