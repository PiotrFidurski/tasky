import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'remix';

import { Calendar } from '~/components/Widgets/Calendar';
import { DayButton } from '~/components/Widgets/Calendar/DayButton';

import { formatDate } from '~/utils/date';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';

export function CalendarModal() {
  const params = useParams<'day'>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);

    navigate(
      `/calendar/${params.day}/create?title=${
        searchParams.get('title') ?? ''
      }&body=${searchParams.get('body') ?? ''}&selectedDate=${
        searchParams.get('selectedDate') ?? formatDate()
      }`
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <Header srDescription="Date picker dialog">Choose day</Header>
          <Calendar startingDate={new Date()} stats={{}}>
            {({ date, day }) => <DayButton day={day} date={date} key={day} />}
          </Calendar>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
