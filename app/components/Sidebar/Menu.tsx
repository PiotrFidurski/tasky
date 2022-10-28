import { format } from 'date-fns';

import { useParams } from '@remix-run/react';

import { NavListItemLink } from '~/components/Elements/NavListItemLink';
import { EditIcon } from '~/components/Icons/EditIcon';

import { DATE_FORMAT } from '~/utils/date';
import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedUser } from '~/types';

import { Button } from '../Elements/Button';
import { CustomLink } from '../Elements/CustomLink';
import { CaretLeft } from '../Icons/CaretLeft';
import { GridIcon } from '../Icons/GridIcon';
import { GridIconFilled } from '../Icons/GridIconFilled';
import { HomeIcon } from '../Icons/HomeIcon';
import { HomeIconFilled } from '../Icons/HomeIconFilled';
import { PlusIcon } from '../Icons/PlusIcon';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { SettingsIconFilled } from '../Icons/SettingsIconFilled';
import { UserMenu } from '../UserMenu';

type Props = {
  expanded: boolean;
  handleCloseMenu?: () => void;
  isMobile?: boolean;
};

export function Menu({
  expanded,
  handleCloseMenu = () => {},
  isMobile = true,
}: Props) {
  const { day } = useParams<'day'>();

  const data = useRouteData<{ user: JsonifiedUser }>('root');

  const dayParam = !day ? format(new Date(), DATE_FORMAT) : day;

  return (
    <nav
      aria-label="sidebar"
      id="sidebar"
      className="mt-12 text-secondary dark:text-primary"
    >
      {isMobile ? (
        <div className="flex justify-end px-16">
          <Button
            onClick={handleCloseMenu}
            className="w-auto"
            aria-controls="sidebar"
            aria-label="close sidebar"
            aria-expanded={expanded}
          >
            <CaretLeft />
          </Button>
        </div>
      ) : null}
      <div className="mb-12 px-16">
        <UserMenu />
      </div>
      <div className="mb-12 px-16">
        <p className="text-4xl">{data?.user?.username}</p>
      </div>
      <ul className="flex flex-col items-start px-14">
        <NavListItemLink to={`/${dayParam}`}>
          {({ isActive }) => (
            <>
              {isActive ? <HomeIconFilled /> : <HomeIcon />}
              <span>Home</span>
            </>
          )}
        </NavListItemLink>
        <NavListItemLink to="/">
          {({ isActive }) => (
            <>
              {isActive ? <GridIconFilled /> : <GridIcon />}
              <span>Categories</span>
            </>
          )}
        </NavListItemLink>
        <NavListItemLink to="/">
          {() => (
            <>
              <EditIcon />
              <span>Tasks</span>
            </>
          )}
        </NavListItemLink>
        <NavListItemLink to="/">
          {({ isActive }) => (
            <>
              {isActive ? <SettingsIconFilled /> : <SettingsIcon />}
              <span>Settings</span>
            </>
          )}
        </NavListItemLink>
        <div className="flex w-full justify-end pr-2">
          <CustomLink
            to={`/${dayParam}/create`}
            aria-label="create task"
            onClick={handleCloseMenu}
          >
            <PlusIcon />
          </CustomLink>
        </div>
      </ul>
    </nav>
  );
}
