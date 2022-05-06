import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { ArrowrightIcon } from '~/components/Icons/ArrowrightIcon';

import { getCalendarHeader } from '~/utils/date';

type HeaderProps = {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function Header({ date, onPrevMonth, onNextMonth }: HeaderProps) {
  const headerContent = getCalendarHeader(date);

  return (
    <div className="flex items-center justify-between w-full">
      <Button onClick={onPrevMonth} isIconWrapper className="w-auto">
        <ArrowleftIcon />
      </Button>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.p
          key={date.toDateString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="font-bold text-xl"
        >
          {headerContent}
        </motion.p>
      </AnimatePresence>
      <Button className="w-auto" isIconWrapper onClick={onNextMonth}>
        <ArrowrightIcon />
      </Button>
    </div>
  );
}
