import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useNavigate, useParams } from 'remix';

import { Calendar } from '~/components/Widgets/Calendar';
import { DayInput } from '~/components/Widgets/Calendar/DayInput';

import { Header } from '../components/Header';

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
          <Header srDescription="Date picker dialog">Choose day</Header>
          <Calendar startingDate={new Date()} stats={{}}>
            {({ date, day }) => <DayInput day={day} date={date} key={day} />}
          </Calendar>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
