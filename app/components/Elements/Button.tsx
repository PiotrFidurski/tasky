import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isGhost?: boolean;
  buttonType?: boolean;
};

function Button({
  children,
  isGhost,
  buttonType,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        isGhost
          ? 'bg-transparent text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600'
          : '',
        `border-2 border-blue-600 w-full bg-blue-600 rounded py-2 text-white font-bold uppercase hover:bg-blue-700 hover:border-blue-700 focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors`,
        className
      )}
      type={buttonType ? 'button' : 'submit'}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  isGhost: false,
  buttonType: false,
};

export { Button };
