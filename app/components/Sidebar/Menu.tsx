import { Button } from '~/components/Elements/Button';
import { NavListItem } from '~/components/Elements/NavListItem';
import { CalendarIcon } from '~/components/Icons/CalendarIcon';
import { CloseIcon } from '~/components/Icons/CloseIcon';
import { EditIcon } from '~/components/Icons/EditIcon';
import { HomeIcon } from '~/components/Icons/HomeIcon';
import { PlusIcon } from '~/components/Icons/PlusIcon';
import { UserMenu } from '~/components/SettingsMenu';

type MenuProps = {
  show: boolean;
  onHandleClose: () => void;
  isMobile?: boolean;
};

export function Menu({ show, onHandleClose, isMobile = true }: MenuProps) {
  return (
    <>
      <nav aria-label="sidebar" id="sidebar">
        <div className="flex items-center p-4">
          <h2 className="w-full">Menu</h2>
          {isMobile ? (
            <div className="flex justify-end">
              <Button
                isIconWrapper
                onClick={onHandleClose}
                buttonType
                aria-controls="sidebar"
                aria-label="close sidebar"
                aria-expanded={show}
              >
                <CloseIcon />
              </Button>
            </div>
          ) : null}
        </div>
        <div className="p-4 mb-4">
          <UserMenu />
        </div>
        <ul className="flex flex-col">
          <NavListItem to="/home">
            {({ isActive }) => (
              <>
                <HomeIcon isFilled={isActive} />
                <span>Home</span>
              </>
            )}
          </NavListItem>
          <NavListItem to="/calendar">
            {({ isActive }) => (
              <>
                <CalendarIcon isFilled={isActive} />
                <span>Calendar</span>
              </>
            )}
          </NavListItem>
          <NavListItem to="/calendar">
            {({ isActive }) => (
              <>
                <EditIcon isFilled={isActive} />
                <span>Tasks</span>
              </>
            )}
          </NavListItem>
        </ul>
      </nav>
      <Button isMenuItem className="flex justify-between p-3">
        <span>Create Task</span>
        <PlusIcon />
      </Button>
    </>
  );
}
