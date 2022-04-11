import clsx from 'clsx';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  isMenuItem?: boolean;
  buttonType?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      primary,
      isMenuItem,
      buttonType,
      className,
      ...htmlButtonProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'flex gap-4 items-center rounded-full dark:text-custom__ghostly w-full transition-all',
          primary &&
            'border bg-indigo-600 border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 text-custom__ghostly',
          isMenuItem &&
            'font-bold px-2 py-4 border-none bg-transparent hover:bg-transparent',
          className
        )}
        type={buttonType ? 'button' : 'submit'}
        {...htmlButtonProps}
      >
        {children}
      </button>
    );
  }
);
