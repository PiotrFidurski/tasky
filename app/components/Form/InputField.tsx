type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function InputField({ ...htmlInputProps }: InputProps) {
  return (
    <input
      className="border-b-2 mt-2 border-slate-600 px-2 py-2 w-full focus:outline-none focus:border-b-blue-600 focus:bg-blue-200 transition-colors"
      {...htmlInputProps}
    />
  );
}

export { InputField };
