import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

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
    <>
      <label
        htmlFor={htmlFor}
        {...htmlLabelProps}
        className={twMerge(
          `relative w-full border-2 dark:border-primary border-secondary
      dark:text-primary rounded-md flex min-h-[5.5rem] text-secondary
      dark:focus-within:border-custom-indigo focus-within:border-custom-blue
      dark:focus-within:text-custom-indigo focus-within:text-custom-blue transition-colors`,
          errorMessage
            ? 'border-rose-600 dark:border-rose-400 text-rose-600 dark:text-rose-400'
            : 'border-secondary dark:border-primary'
        )}
      >
        <div className="w-full items-baseline flex flex-col h-full justify-between">
          <motion.div className="px-2 text-xs font-normal mt-1">
            <span>{labelName}</span>
          </motion.div>
          <div className="w-full">{children}</div>
        </div>
      </label>
      <div
        className={twMerge(
          'text-xs min-h-[25px]',
          errorMessage && 'text-rose-600 dark:text-rose-400'
        )}
      >
        {errorMessage ? <span>{errorMessage}</span> : null}
      </div>
    </>
  );
}
