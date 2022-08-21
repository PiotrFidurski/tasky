import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { format, isToday } from 'date-fns';

import { Button } from '~/components/Elements/Button';
import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';
import { ArrowrightIcon } from '~/components/Icons/ArrowrightIcon';

type HeaderProps = {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function Header({ date, onPrevMonth, onNextMonth }: HeaderProps) {
  const headerContent = format(date, 'dd MMMM, yyyy');

  return (
    <header className="flex items-center justify-between w-full">
      <Button
        onClick={onPrevMonth}
        className="border-transparent dark:border-transparent"
      >
        <ArrowleftIcon />
      </Button>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.p
          key={date.toDateString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={twMerge(
            'font-bold text-xl',
            isToday(date) && 'text-custom-blue dark:text-custom-indigo'
          )}
        >
          {headerContent}
        </motion.p>
      </AnimatePresence>
      <Button
        className="border-transparent dark:border-transparent"
        onClick={onNextMonth}
      >
        <ArrowrightIcon />
      </Button>
    </header>
  );
}
