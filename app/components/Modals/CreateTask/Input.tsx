import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...htmlInputProps }, ref) => {
    return (
      <input
        ref={ref}
        {...htmlInputProps}
        className="bg-transparent w-full h-full p-2 dark:text-lightGray"
      />
    );
  }
);
