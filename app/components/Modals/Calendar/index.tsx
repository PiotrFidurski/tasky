import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'remix';

import { Calendar } from '~/components/Widgets/Calendar';
import { DayButton } from '~/components/Widgets/Calendar/DayButton';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';

function getUrlFromSearchParams(entries: Array<Array<string>>) {
  return entries.map(([key, value], index) => {
    return index < entries.length - 1 ? `${key}=${value}&` : `${key}=${value}`;
  });
}

export function CalendarModal() {
  const params = useParams<'day'>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);

    const urlSearchParams = getUrlFromSearchParams([
      ...searchParams.entries(),
    ]).join('');

    navigate(`/calendar/${params.day}/create?${urlSearchParams}`);
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
