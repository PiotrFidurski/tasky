import { useParams } from 'remix';

import { NavListItem } from '~/components/Elements/NavListItem';

import { formatDate } from '~/utils/date';

import { CustomLink } from './Elements/CustomLink';
import { UserMenuDropdown } from './SettingsMenu';

export function Sidebar() {
  const { day } = useParams<'day'>();

  const dayParam = !day ? formatDate() : day;

  return (
    <div className="w-full flex flex-col items-start justify-between min-h-[calc(100vh-2rem)]">
      <div className="w-full">
        <div className="flex lg:justify-end w-full p-2 mb-10 text-custom__gray dark:text-custom__ghostly">
          {/* dropdown menu */}
          <UserMenuDropdown />
        </div>
        {/* nav list */}
        <nav>
          <ul className="flex flex-col gap-4">
            <NavListItem to="/home">
              {/* home icon */}
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  )}
                  <span className="sr-only lg:not-sr-only">Home</span>
                </>
              )}
            </NavListItem>
            <NavListItem to="/calendar">
              {/* calendar icon */}
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
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
          className="flex items-center lg:justify-between p-4 rounded-full font-semibold uppercase"
        >
          <span className="sr-only lg:not-sr-only">Create task</span>
          {/* plus icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </CustomLink>
      </div>
    </div>
  );
}
