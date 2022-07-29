import { format } from 'date-fns';

import { useParams } from '@remix-run/react';

import { NavListItem } from '~/components/Elements/NavListItemv2';
import { EditIcon } from '~/components/Icons/EditIcon';

import { DATE_FORMAT } from '~/utils/date';

import { useUser } from '../Auth/useUser';
import { Button } from '../Elements/Buttonv2';
import { CaretLeft } from '../Icons/CaretLeft';
import { GridIcon } from '../Icons/GridIcon';
import { GridIconFilled } from '../Icons/GridIconFilled';
import { HomeIcon } from '../Icons/HomeIcon';
import { HomeIconFilled } from '../Icons/HomeIconFilled';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { SettingsIconFilled } from '../Icons/SettingsIconFilled';
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
    <nav aria-label="sidebar" id="sidebar" className="mt-12">
      <div className="flex items-center">
        {isMobile ? (
          <div className="flex justify-end w-full px-16">
            <Button
              isIconWrapper
              onClick={onHandleClose}
              buttonType
              aria-controls="sidebar"
              aria-label="close sidebar"
              aria-expanded={visible}
            >
              <CaretLeft />
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mb-12 px-16">
        <Button aria-label="open menu" type="button">
          <UserAvatar width={60} height={60} />
        </Button>
      </div>
      <div className="mb-12 px-16">
        <p className="text-4xl text-secondary dark:text-primary">
          {user?.username}
        </p>
      </div>
      <ul className="flex flex-col text-base px-14">
        <NavListItem to={`/${dayParam}`}>
          {({ isActive }) => (
            <>
              {isActive ? <HomeIconFilled /> : <HomeIcon />}
              <span>Home</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/">
          {({ isActive }) => (
            <>
              {isActive ? <GridIconFilled /> : <GridIcon />}
              <span>Categories</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar">
          {() => (
            <>
              <EditIcon />
              <span>Tasks</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar">
          {({ isActive }) => (
            <>
              {isActive ? <SettingsIconFilled /> : <SettingsIcon />}
              <span>Settings</span>
            </>
          )}
        </NavListItem>
      </ul>
    </nav>
  );
}
