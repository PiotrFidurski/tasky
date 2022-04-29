import { format, isToday, startOfMonth } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

type HeaderProps = {
  date: Date;
};

export function Header({ date }: HeaderProps) {
  const headerContent = format(
    isToday(date) ? date : startOfMonth(date),
    'dd MMMM, yyyy'
  );

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
