import { format } from 'date-fns';

import { useParams } from '@remix-run/react';

import { NavListItem } from '~/components/Elements/NavListItem';
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
    <nav aria-label="sidebar" id="sidebar" className="mt-12 px-16">
      <div className="flex items-center">
        {isMobile ? (
          <div className="flex justify-end w-full">
            <Button
              isIconWrapper
              onClick={onHandleClose}
              buttonType
              className="rounded-full border-2 border-borderAndIcons text-primary p-3"
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
          className="w-auto border-2 border-borderAndIcons rounded-full p-2"
          aria-label="open menu"
          type="button"
        >
          <UserAvatar width={60} height={60} />
        </Button>
      </div>
      <div className="mb-12">
        <p className="text-4xl">{user?.username}</p>
      </div>
      <ul className="flex flex-col text-base">
        <NavListItem to={`/${dayParam}`} className="font-normal">
          {({ isActive }) => (
            <>
              {isActive ? (
                <HomeIconFilled className="fill-borderAndIcons" />
              ) : (
                <HomeIcon className="stroke-borderAndIcons" />
              )}
              <span>Home</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/" className="font-normal">
          {({ isActive }) => (
            <>
              {isActive ? (
                <GridIconFilled className="fill-borderAndIcons" />
              ) : (
                <GridIcon className="stroke-borderAndIcons" />
              )}
              <span>Categories</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar" className="font-normal">
          {() => (
            <>
              <EditIcon className="stroke-borderAndIcons" />
              <span>Tasks</span>
            </>
          )}
        </NavListItem>
        <NavListItem to="/calendar" className="font-normal">
          {({ isActive }) => (
            <>
              {isActive ? (
                <SettingsIconFilled className="fill-borderAndIcons" />
              ) : (
                <SettingsIcon className="stroke-borderAndIcons" />
              )}
              <span>Settings</span>
            </>
          )}
        </NavListItem>
      </ul>
    </nav>
  );
}
