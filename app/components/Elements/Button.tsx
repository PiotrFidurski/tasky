import clsx from 'clsx';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  isIconWrapper?: boolean;
  buttonType?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      primary,
      isIconWrapper,
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
          isIconWrapper &&
            'p-2 border-none bg-transparent hover:bg-[#1b2539] focus:ring-pink-200 focus:ring-2 focus:ring-inset focus:outline-none focus:bg-[#1b2539]',
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
