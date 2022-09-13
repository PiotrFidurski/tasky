import * as Dialog from '@radix-ui/react-dialog';

import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { Calendar } from '~/components/Widgets/Calendar';
import { DayButton } from '~/components/Widgets/Calendar/components/DayButton';

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
          <div className="w-full flex p-4">
            <Button className="w-auto" onClick={handleOpenChange}>
              <ArrowleftIcon />
            </Button>
          </div>
          <Calendar
            startingDate={new Date()}
            stats={{}}
            wrapperClassname="bg-transparent dark:bg-transparent max-w-md"
          >
            {({ date, day }) => <DayButton day={day} date={date} key={day} />}
          </Calendar>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
