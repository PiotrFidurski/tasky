import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: boolean;
  primary?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, buttonType, className, primary, ...htmlButtonProps }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          `outline-none border-2 rounded-full p-3 text-secondary dark:text-primary
        border-buttonColor dark:border-borderAndIcons
         focus:border-secondary dark:focus:border-light 
         focus:bg-light-rgba dark:focus:bg-dark-rgba
         hover:border-secondary dark:hover:border-light 
         hover:bg-light-rgba dark:hover:bg-dark-rgba
         transition-colors`,
          primary &&
            `bg-buttonColor dark:bg-primary text-primary dark:text-secondary focus:bg-blue-800 dark:focus:bg-borderAndIcons border-none hover:bg-blue-800 dark:hover:bg-borderAndIcons`,
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
