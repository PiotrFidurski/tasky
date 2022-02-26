import clsx from 'clsx';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isGhost?: boolean;
  buttonType?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line react/prop-types
  ({ children, isGhost, buttonType, className, ...htmlButtonProps }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'border-2 border-blue-600 w-full uppercase font-bold focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors',
          isGhost
            ? 'bg-transparent text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700',
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
  isGhost: false,
  buttonType: false,
};
