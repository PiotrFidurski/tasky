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
          'flex gap-4 items-center w-full transition-all',
          primary && 'border border-highlight ',
          isMenuItem &&
            'focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none',
          isIconWrapper &&
            'p-2 border-none bg-transparent rounded-full focus:ring-highlight focus:ring-2 focus:ring-inset focus:outline-none',
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
