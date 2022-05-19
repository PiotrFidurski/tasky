import { ArrowleftIcon } from '~/components/Icons/ArrowleftIcon';

type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
};

export function Label({
  htmlFor,
  children,
  errorMessage,
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
          <div className="max-w-[70%]">
            <span className="px-2">{htmlFor}</span>
            {children}
          </div>
          <div className="max-w-[30%] px-2 flex justify-end">
            <ArrowleftIcon />
          </div>
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
