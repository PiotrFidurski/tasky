import * as Dialog from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { Calendar } from '~/components/Widgets/Calendar';
import { DayButton } from '~/components/Widgets/Calendar/components/DayButton';

import { modalContent, modalOverlay } from '../classNames';
import { BackButton } from '../components/BackButton';

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
          <BackButton />
          <Calendar startingDate={new Date()} stats={{}}>
            {({ date, day }) => <DayButton day={day} date={date} key={day} />}
          </Calendar>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
