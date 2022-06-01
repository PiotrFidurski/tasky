import clsx from 'clsx';
import { ReactNode } from 'react';

type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
  hasIcon?: boolean;
  icon?: ReactNode;
  labelName: string;
};

export function FieldWrapper({
  children,
  errorMessage,
  htmlFor,
  className,
  labelName,
  hasIcon,
  icon,
  ...htmlLabelProps
}: FieldWrapperProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        {...htmlLabelProps}
        className={clsx(
          'mb-4 w-full border-2 border-slate-900 dark:border-gray-500 rounded-md flex relative min-h-[4rem] dark:focus-within:border-highlight focus-within:border-highlightDarker dark:focus-within:text-highlight focus-within:text-highlightDarker transition-colors',
          className
        )}
      >
        <div className="flex justify-between items-center w-full">
          <div className="w-full">
            <span className="px-2">{labelName}</span>
            {children}
          </div>
          {hasIcon ? (
            <div className="max-w-[30%] pr-4 flex justify-end h-full items-center">
              {icon}
            </div>
          ) : null}
        </div>
      </label>
      <div>
        <span
          aria-live="polite"
          aria-atomic="true"
          className="text-rose-500 font-semibold text-xs"
        >
          {errorMessage}
        </span>
      </div>
    </>
  );
}
