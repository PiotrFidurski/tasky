import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
  icon?: ReactNode;
  labelName: string;
};

export function FieldWrapper({
  children,
  errorMessage,
  htmlFor,
  className,
  labelName,
  icon,
  ...htmlLabelProps
}: FieldWrapperProps) {
  return (
    <label
      htmlFor={htmlFor}
      {...htmlLabelProps}
      className={clsx(
        'mb-4 w-full border-2 border-gray-500 rounded-md flex relative min-h-[4rem] focus-within:border-highlight focus-within:text-highlight transition-colors',
        className
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div className="w-full items-baseline flex flex-col">
          <motion.div
            className="px-2 text-sm font-semibold min-w-[16rem] text-left"
            layout
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transform: errorMessage
                ? 'translateY(-70%) translateX(10%)'
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
                className="text-rose-500 text-xs bg-slate-900 px-2"
              >
                {errorMessage}
              </span>
            )}
          </motion.div>
          <div>{children}</div>
        </div>
        {icon ? (
          <div className="max-w-[30%] pr-4 flex justify-end h-full items-center">
            {icon}
          </div>
        ) : null}
      </div>
    </label>
  );
}
