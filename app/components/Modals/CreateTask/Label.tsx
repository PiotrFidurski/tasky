import { ReactNode } from 'react';

type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
  hasIcon?: boolean;
  icon?: ReactNode;
};

export function Label({
  htmlFor,
  children,
  errorMessage,
  hasIcon,
  icon,
  ...htmlLabelProps
}: FieldWrapperProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        {...htmlLabelProps}
        className="mb-4 w-full border border-gray-500 rounded-md flex text-lightGray relative min-h-[4rem]"
      >
        <div className="flex justify-between items-center w-full">
          <div className="w-full">
            <span className="px-2">{htmlFor}</span>
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
