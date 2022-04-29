import { AnimatePresence, motion } from 'framer-motion';

import { getCalendarHeader } from '~/utils/date';

type HeaderProps = {
  date: Date;
};

export function Header({ date }: HeaderProps) {
  const headerContent = getCalendarHeader(date);

  return (
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
  );
}
