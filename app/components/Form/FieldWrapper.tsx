type FieldWrapperProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  errorMessage: string | string[];
};

function FieldWrapper({
  children,
  errorMessage,
  htmlFor,
  ...props
}: FieldWrapperProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <label htmlFor={htmlFor} {...props}>
      <span className="text-slate-900 font-semibold">{htmlFor}</span>
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
