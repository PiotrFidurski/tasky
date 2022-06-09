import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ ...htmlInputProps }, ref) => {
    return (
      <input
        ref={ref}
        className="text-black dark:text-white bg-transparent w-full h-full py-2 px-2"
        {...htmlInputProps}
      />
    );
  }
);
