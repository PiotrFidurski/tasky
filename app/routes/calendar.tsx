import { LoaderFunction, Outlet, redirect } from 'remix';

import { WeekDayNames } from '~/components/Calendar/DayNames';
import { Weeks as CalendarWeeks } from '~/components/Calendar/Weeks';
import { Sidebar } from '~/components/Sidebar';

import { createCalendar, formatDate } from '~/utils/date';

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.day) {
    const today = formatDate();
    return redirect(`/calendar/${today}`);
  }

  return null;
};

export default function CalendarRoute() {
  const matrix = createCalendar();

  return (
    <main className="flex gap-2 w-full">
      <Sidebar
        // hardcode for now, implement authcontext later
        user={{
          id: '1',
          username: 'chimson',
          updatedAt: new Date(),
          createdAt: new Date(),
          password: 'ss',
        }}
      />
      <div className="flex w-full ml-[17rem] gap-2">
        <div>
          <WeekDayNames />
          <CalendarWeeks data={matrix} />
        </div>
        <div className="max-w-full w-full flex gap-2 items-start">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
