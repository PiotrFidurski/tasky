import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, buttonType, className, ...htmlButtonProps }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
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
