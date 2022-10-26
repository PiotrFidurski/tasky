import * as Dialog from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { Calendar } from '~/components/Widgets/Calendar';
import { DayButton } from '~/components/Widgets/Calendar/components/DayButton';

import { ModalHeader } from '../ModalHeader';
import { modalContent, modalOverlay } from '../classNames';

export function CalendarModal() {
  const navigate = useNavigate();

  const handleOpenChange = () => {
    navigate(-1);
  };

  return (
    <Dialog.Root defaultOpen onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <div className="flex w-full p-4 items-center">
            <ModalHeader>Calendar</ModalHeader>
          </div>
          <Calendar
            startingDate={new Date()}
            wrapperClassname="bg-transparent dark:bg-transparent max-w-md"
          >
            {({ date, day }) => <DayButton day={day} date={date} key={day} />}
          </Calendar>
          <Dialog.Description className="sr-only">
            Calendar dialog
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
