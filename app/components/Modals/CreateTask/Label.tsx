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
    <label
      htmlFor={htmlFor}
      {...htmlLabelProps}
      className="border border-gray-500 rounded-md flex flex-col justify-end text-lightGray relative min-h-[4rem]"
    >
      <span className="absolute left-2 top-2">{htmlFor}</span>
      {children}
      <div>
        <span
          aria-live="polite"
          aria-atomic="true"
          className="text-rose-500 font-semibold text-xs"
        >
          {errorMessage}
        </span>
      </div>
    </label>
  );
}
