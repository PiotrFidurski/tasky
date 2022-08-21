import clsx from 'clsx';
import { motion } from 'framer-motion';

type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
  labelName: string;
};

export function FieldWrapper({
  children,
  errorMessage,
  htmlFor,
  className,
  labelName,
  ...htmlLabelProps
}: FieldWrapperProps) {
  return (
    <label
      htmlFor={htmlFor}
      {...htmlLabelProps}
      className={`mb-4 w-full border-2 dark:border-primary border-secondary
       dark:text-primary rounded-md flex relative min-h-[5.5rem] text-secondary
       dark:focus-within:border-custom-indigo focus-within:border-custom-blue
       dark:focus-within:text-custom-indigo focus-within:text-custom-blue transition-colors`}
    >
      <div className="w-full items-baseline flex flex-col h-full justify-between">
        <motion.div
          className={clsx(
            'px-2 text-xs font-normal min-w-[16rem] text-left',
            !errorMessage ? 'mt-1' : 'bg-primary dark:bg-secondary'
          )}
          layout
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transform: errorMessage
              ? 'translateY(-60%) translateX(5%)'
              : 'translateY(0) translateX(0)',
          }}
          exit={{ opacity: 0 }}
          key={JSON.stringify(errorMessage)}
        >
          {!errorMessage ? (
            <span>{labelName}</span>
          ) : (
            <span
              aria-live="polite"
              aria-atomic="true"
              className="text-rose-600 dark:text-rose-400 px-2"
            >
              {errorMessage}
            </span>
          )}
        </motion.div>
        <div className="w-full">{children}</div>
      </div>
    </label>
  );
}
