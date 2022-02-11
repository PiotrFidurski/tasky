import { User } from '@prisma/client';

import { Form, Link } from 'remix';

import { Button } from '~/components/Elements/Button';
import { NavListItem } from '~/components/Elements/NavListItem';

function Sidebar({ user }: { user: User }) {
  return (
    <div className="flex h-full flex-col justify-between min-h-[calc(100vh-2rem)]">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-300 w-full px-2 py-4 text-slate-600">
          <Link to="/">Some logo here</Link>
          <button type="button" aria-label="toggle dark mode">
            {/* toggle theme icon */}
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-2">
          <ul className="px-2 flex flex-col gap-4">
            <NavListItem to="/home">
              {/* home icon */}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Home</span>
            </NavListItem>
            <NavListItem to="/calendar">
              {/* calendar icon */}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Calendar</span>
            </NavListItem>
            <NavListItem to="/somwhere">
              {/* home icon */}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Somwhere</span>
            </NavListItem>
            <Form action="/logout" method="post" className="w-full">
              <Button isGhost>logout</Button>
            </Form>
          </ul>
        </nav>
      </div>
      <div className="flex justify-between items-center text-slate-600 border-t border-slate-300 px-2 py-2">
        <div className="flex items-center gap-2">
          <img
            src="//unsplash.it/40/40"
            width="40px"
            height="40px"
            alt="user avatar"
            className="rounded-full border-2 border-slate-600"
          />
          <span className="font-bold text-slate-600">{user.username}</span>
        </div>
        <button type="button" aria-label="open menu">
          {/* ellipsis icon */}
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export { Sidebar };
