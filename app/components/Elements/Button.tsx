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
          'flex gap-4 outline-none items-center w-full transition-all focus:ring-2 focus:ring-highlight',
          isMenuItem && 'focus:ring-highlight focus:ring-2 focus:ring-inset',
          primary &&
            'bg-highlight rounded-full py-2 px-4 focus:bg-highlightActive justify-center ring-2 ring-highlight text-white font-bold',
          isIconWrapper &&
            'p-2 rounded-full focus:ring-highlight focus:ring-2 focus:ring-inset',
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
