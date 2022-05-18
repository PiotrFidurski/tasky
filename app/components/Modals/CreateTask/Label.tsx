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
      className="p-2 border border-gray-500 rounded-md flex flex-col items-center justify-center"
    >
      <span className="sr-only">{htmlFor}</span>
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
