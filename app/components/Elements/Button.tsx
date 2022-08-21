import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, type = 'button', className, primary, ...htmlButtonProps },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          `outline-none border-2 rounded-full p-3 text-secondary dark:text-primary
         border-custom-blue dark:border-custom-indigo transition-colors
         focus:border-secondary dark:focus:border-primary focus:bg-light-rgba dark:focus:bg-dark-rgba
         hover:border-secondary dark:hover:border-primary hover:bg-light-rgba dark:hover:bg-dark-rgba`,
          primary &&
            `bg-custom-blue border-2 dark:border-primary border-custom-blue
             dark:bg-primary text-primary dark:text-secondary focus:bg-blue-800
             dark:focus:bg-custom-indigo hover:bg-blue-800 dark:hover:bg-custom-indigo
             hover:border-custom-blue dark:hover:border-custom-indigo
             focus:border-custom-blue dark:focus:border-custom-indigo`,
          className
        )}
        // eslint-disable-next-line react/button-has-type
        type={type}
        {...htmlButtonProps}
      >
        {children}
      </button>
    );
  }
);
