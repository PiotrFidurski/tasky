import clsx from 'clsx';
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
          <div className="w-full items-baseline flex flex-col">
            <span className="px-2 text-sm font-bold">{labelName}</span>
            <div>{children}</div>
          </div>
          {icon ? (
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
