type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
};

function FieldWrapper({
  children,
  errorMessage,
  htmlFor,
  ...htmlLabelProps
}: FieldWrapperProps) {
  return (
    <label htmlFor={htmlFor} {...htmlLabelProps}>
      <span className="text-slate-900 inline-block font-semibold first-letter:capitalize">
        {htmlFor}
      </span>
      {children}
      <div className="min-h-[1rem] flex items-center mt-1">
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

export { FieldWrapper };
