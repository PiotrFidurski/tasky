import { format } from 'date-fns';

import { useParams } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { CustomLink } from '~/components/Elements/CustomLink';
import { NavListItem } from '~/components/Elements/NavListItem';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { EditIcon } from '~/components/Icons/EditIcon';
import { HomeIcon } from '~/components/Icons/HomeIcon';
import { PlusIcon } from '~/components/Icons/PlusIcon';
import { UserMenu } from '~/components/UserMenu';

import { DATE_FORMAT } from '~/utils/date';

import { useUser } from '../Auth/useUser';
import { CaretLeft } from '../Icons/CaretLeft';
import { GridIcon } from '../Icons/GridIcon';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { UserAvatar } from '../UserMenu/UserAvatar';

type MenuProps = {
  visible: boolean;
  onHandleClose?: () => void;
  isMobile?: boolean;
};

export function Menuv2({
  visible,
  onHandleClose = () => {},
  isMobile = true,
}: MenuProps) {
  const { day } = useParams<'day'>();

  const { user } = useUser();

  const dayParam = !day ? format(new Date(), DATE_FORMAT) : day;

  return (
    <nav aria-label="sidebar" id="sidebar" className="mt-12 px-16">
      <div className="flex items-center">
        {isMobile ? (
          <div className="flex justify-end w-full">
            <Button
              isIconWrapper
              onClick={onHandleClose}
              buttonType
              className="rounded-full border-2 border-borderAndIcons text-primary p-4"
              aria-controls="sidebar"
              aria-label="close sidebar"
              aria-expanded={visible}
            >
              <CaretLeft />
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mb-12">
        <Button
          className="w-auto border-4 border-borderAndIcons rounded-full p-2"
          aria-label="open menu"
          type="button"
        >
          <UserAvatar width={60} height={60} />
        </Button>
      </div>
      <div className="mb-12">
        <p className="text-xl">{user?.username}</p>
      </div>
      <ul className="flex flex-col">
        <NavListItem to={`/${dayParam}`} className="font-normal">
          {({ isActive }) => (
            <>
              <GridIcon className="stroke-borderAndIcons" />
              <span>Home</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar" className="font-normal">
          {({ isActive }) => (
            <>
              <GridIcon />
              <span>Calendar</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar" className="font-normal">
          {() => (
            <>
              <EditIcon />
              <span>Tasks</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar" className="font-normal">
          {() => (
            <>
              <SettingsIcon className="stroke-borderAndIcons" />
              <span>Settings</span>
            </>
          )}
        </NavListItem>
        <CustomLink
          to={`/${dayParam}/create`}
          aria-label="create task"
          className="flex justify-between p-3 w-auto rounded-none ml-[0.125rem]"
        >
          <span>Create Task</span>
          <PlusIcon />
        </CustomLink>
      </ul>
    </nav>
  );
}
