import { useParams } from 'remix';

import { CustomLink } from '~/components/Elements/CustomLink';
import { NavListItem } from '~/components/Elements/NavListItem';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { HomeIcon } from '~/components/Icons/HomeIcon';
import { PlusIcon } from '~/components/Icons/PlusIcon';
import { UserMenu } from '~/components/SettingsMenu';

import { formatDate } from '~/utils/date';

export function Sidebar() {
  const { day } = useParams<'day'>();

  const dayParam = !day ? formatDate() : day;

  return (
    <div className="w-full flex flex-col items-start justify-between min-h-[calc(100vh-2rem)]">
      <div className="w-full">
        <div className="flex lg:justify-end w-full p-2 mb-10 text-custom__gray dark:text-custom__ghostly">
          <UserMenu />
        </div>
        <nav>
          <ul className="flex flex-col gap-4">
            <NavListItem to={`/${dayParam}`}>
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
      <div className="w-auto lg:w-full">
        <CustomLink
          aria-label="create task"
          to={`/calendar/${dayParam}/create`}
          className="flex items-center lg:justify-between p-4 rounded-full font-semibold uppercase"
        >
          <span className="sr-only lg:not-sr-only">Create task</span>
          <PlusIcon />
        </CustomLink>
      </div>
    </div>
  );
}
