import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ ...htmlInputProps }, ref) => (
    <input
      ref={ref}
      className="text-secondary dark:text-primary bg-transparent w-full h-full py-2 px-2 rounded-br-[0.200rem] rounded-bl-[0.200rem]"
      {...htmlInputProps}
    />
  )
);
