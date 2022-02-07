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
        'border-2 border-blue-600 w-full py-2 rounded uppercase font-bold focus:outline-dashed outline-offset-2 focus:outline-2 focus:outline-blue-900 transition-colors',
        isGhost
          ? 'bg-transparent text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600'
          : 'bg-blue-600  text-white hover:bg-blue-700 hover:border-blue-700',
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
