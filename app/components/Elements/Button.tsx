import clsx from 'clsx';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  isIconWrapper?: boolean;
  buttonType?: boolean;
  isMenuItem?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      primary,
      isIconWrapper,
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
          'flex gap-4 items-center dark:text-custom__ghostly w-full transition-all',
          primary &&
            'border bg-indigo-600 border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 text-custom__ghostly',
          isMenuItem &&
            'hover:bg-active focus:bg-light_active dark:focus:bg-dark_active focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none',
          isIconWrapper &&
            'p-2 border-none bg-transparent rounded-full hover:bg-active dark:hover:bg-active_dark focus:bg-active dark:focus:bg-active_dark focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none',
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
