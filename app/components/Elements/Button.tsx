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
        border-custom-blue dark:border-custom-indigo transition-colors
         focus:border-secondary focus:bg-light-rgba dark:focus:bg-dark-rgba
         hover:border-secondary hover:bg-light-rgba dark:hover:bg-dark-rgba`,
          primary &&
            `bg-custom-blue dark:bg-primary text-primary dark:text-secondary focus:bg-blue-800 dark:focus:bg-custom-indigo border-none hover:bg-blue-800 dark:hover:bg-custom-indigo`,
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
