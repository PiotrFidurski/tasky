type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function InputField({ ...htmlInputProps }: InputProps) {
  return (
    <input
      className="border-b-2 mt-2 border-custom__gray p-2 w-full focus:outline-none focus:border-b-blue-600 focus:bg-blue-200 transition-colors"
      {...htmlInputProps}
    />
  );
}

export { InputField };
