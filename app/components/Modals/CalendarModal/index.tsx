import * as Modal from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { Calendar } from '~/components/Widgets/Calendar';
import { DayButton } from '~/components/Widgets/Calendar/components/DayButton';

import { ModalHeader } from '../ModalHeader';
import { contentClassnames, overlayClassnames } from '../classNames';

export function CalendarModal() {
  const navigate = useNavigate();

  const handleOpenChange = () => {
    navigate(-1);
  };

  return (
    <Modal.Root defaultOpen onOpenChange={handleOpenChange}>
      <Modal.Trigger />
      <Modal.Portal>
        <Modal.Overlay className={overlayClassnames} />
        <Modal.Content className={contentClassnames}>
          <ModalHeader>Calendar</ModalHeader>
          <Calendar
            startingDate={new Date()}
            wrapperClassname="bg-transparent dark:bg-transparent max-w-md"
          >
            {({ date, day }) => <DayButton day={day} date={date} key={day} />}
          </Calendar>
          <Modal.Description className="sr-only">
            Calendar modal
          </Modal.Description>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}
