import clsx from 'clsx';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isMenuItem?: boolean;
  buttonType?: boolean;
  primary?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      buttonType,
      className,
      primary,
      isMenuItem,
      ...htmlButtonProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'flex gap-4 items-center text-custom__ghostly w-full transition-all',
          primary &&
            'border-2 bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700',
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

Button.defaultProps = {
  isMenuItem: false,
  primary: false,
  buttonType: false,
};
