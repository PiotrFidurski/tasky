import { useParams } from 'remix';

import { NavListItem } from '~/components/Elements/NavListItem';

import { formatDate } from '~/utils/date';

import { CustomLink } from './Elements/CustomLink';
import { CalendarIcon } from './Icons/CalendarIcon';
import { HomeIcon } from './Icons/HomeIcon';
import { PlusIcon } from './Icons/PlusIcon';
import { UserMenuDropdown } from './SettingsMenu';

export function Sidebar() {
  const { day } = useParams<'day'>();

  const dayParam = !day ? formatDate() : day;

  return (
    <div className="w-full flex flex-col items-start justify-between min-h-[calc(100vh-2rem)]">
      <div className="w-full">
        <div className="flex lg:justify-end w-full p-2 mb-10 text-custom__gray dark:text-custom__ghostly">
          <UserMenuDropdown />
        </div>
        <nav>
          <ul className="flex flex-col gap-4">
            <NavListItem to="/home">
              {({ isActive }) => (
                <>
                  <HomeIcon isFilled={isActive} />
                  <span className="sr-only lg:not-sr-only">Home</span>
                </>
              )}
            </NavListItem>
            <NavListItem to="/calendar">
              {({ isActive }) => (
                <>
                  <CalendarIcon isFilled={isActive} />
                  <span className="sr-only lg:not-sr-only">Calendar</span>
                </>
              )}
            </NavListItem>
          </ul>
        </nav>
      </div>
      {/* create task button */}
      <div className="w-auto lg:w-full">
        {/* this is the same as register links so maybe make it a component */}
        <CustomLink
          aria-label="create task"
          to={`/calendar/${dayParam}/create`}
          className="flex items-center lg:justify-between p-4 rounded-full"
        >
          <span className="sr-only lg:not-sr-only">Create task</span>
          <PlusIcon />
        </CustomLink>
      </div>
    </div>
  );
}
