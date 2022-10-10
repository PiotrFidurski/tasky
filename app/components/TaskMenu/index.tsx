import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useState } from 'react';

import { Link } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { DropdownItem } from '~/components/Elements/DropdownItem';
import { DropdownTrigger } from '~/components/Elements/DropdownTrigger';
import { CaretDown } from '~/components/Icons/CaretDown';
import { EditIcon } from '~/components/Icons/EditIcon';

import { useRouteData } from '~/utils/hooks/useRouteData';

import { JsonifiedTask, JsonifiedUser } from '~/types';

import { DropdownContent } from '../Elements/DropdownContent';
import { Warning } from '../Modals/Warning';
import { DeleteTaskForm } from './DeleteTaskForm';

type Props = {
  task: JsonifiedTask;
};

export default function TaskMenu({ task }: Props) {
  const data = useRouteData<{ user: JsonifiedUser }>('root');

  const [open, setOpen] = useState({ dropdown: false, warning: false });

  const handleOpenChange = () => {
    setOpen((p) => ({ ...p, dropdown: !p.dropdown }));
  };

  const handleWarningChange = () => {
    setOpen((p) => ({ ...p, warning: !p.warning, dropdown: false }));
  };

  return (
    <>
      <DropdownMenu.Root open={open.dropdown} onOpenChange={handleOpenChange}>
        <DropdownTrigger asChild>
          <Button
            primary
            className="flex justify-center items-center p-0 max-w-[24px] h-[24px] w-full"
            aria-label="open task menu"
          >
            <CaretDown />
          </Button>
        </DropdownTrigger>
        <DropdownContent loop sideOffset={10}>
          {data?.user?.id === task.userId ? (
            <DeleteTaskForm
              handleWarningChange={handleWarningChange}
              handleOpenChange={handleOpenChange}
              userId={data.user.id}
              taskId={task.id}
            />
          ) : null}
          {data?.user?.id === task.userId ? (
            <DropdownItem asChild isLastItem>
              <Link
                to={`${task.id}/edit`}
                className="flex items-center gap-4 w-full px-2 py-4"
              >
                <EditIcon />
                <span>Edit Task</span>
              </Link>
            </DropdownItem>
          ) : null}
        </DropdownContent>
      </DropdownMenu.Root>
      <Warning
        open={open.warning}
        onChange={handleWarningChange}
        onDiscard={() => {}}
      />
    </>
  );
}
