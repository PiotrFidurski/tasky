import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useNavigate, useParams } from 'remix';

import { Button } from '~/components/Elements/Button';
import { CloseIcon } from '~/components/Icons/CloseIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { DayInput } from '~/components/Widgets/Calendar/DayInput';

export function CalendarModal() {
  const params = useParams<'day'>();

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);
    navigate(`/calendar/${params.day}/create`);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-custom__gray dark:bg-custom__ghostly fixed inset-0 opacity-20 z-50" />
        <Dialog.Content className="z-50 absolute inset-0 h-full bottom-auto dark:bg-slate-900 bg-light text-darkGray dark:text-lightGray max-w-full lg:max-w-lg m-auto">
          <Button onClick={handleOpenChange}>
            <CloseIcon />
          </Button>
          <Calendar startingDate={new Date()} stats={{}}>
            {({ date, day, stats }) => (
              <DayInput day={day} date={date} key={day} stats={stats} />
            )}
          </Calendar>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
