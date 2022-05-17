import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ ...htmlInputProps }, ref) => {
    return (
      <input
        ref={ref}
        className="border-b-2 mt-2 p-2 w-full focus:outline-none focus:border-b-highlight focus:bg-indigo-100 transition-colors"
        {...htmlInputProps}
      />
    );
  }
);
