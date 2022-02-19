import clsx from 'clsx';

type TagProps = React.HtmlHTMLAttributes<HTMLSpanElement>;

export default function Tag({ className, children, ...props }: TagProps) {
  return (
    <span
      className={clsx(
        `rounded-full px-2 py-1 bg-indigo-400 text-custom__ghostly min-w-0
         overflow-hidden text-ellipsis max-w-[4rem] w-full
        text-center font-semibold text-xs uppercase`,
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </span>
  );
}
