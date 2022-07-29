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
          `outline-none border-2 rounded-full p-3 text-secondary dark:text-primary
          border-buttonColor dark:border-borderAndIcons
           focus:border-secondary dark:focus:border-light 
           focus:bg-light-rgba dark:focus:bg-dark-rgba
           transition-colors`,
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
