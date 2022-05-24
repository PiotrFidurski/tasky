import clsx from 'clsx';
import { ReactNode } from 'react';

type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
  hasIcon?: boolean;
  icon?: ReactNode;
  labelName: string;
};

export function Label({
  htmlFor,
  children,
  errorMessage,
  hasIcon,
  icon,
  labelName,
  className,
  ...htmlLabelProps
}: FieldWrapperProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        {...htmlLabelProps}
        className={clsx(
          'mb-4 w-full border-2 border-gray-500 rounded-md flex relative min-h-[4rem] focus-within:border-highlight focus-within:text-highlight transition-colors',
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
