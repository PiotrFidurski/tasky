import clsx from 'clsx';

type TagProps = React.HtmlHTMLAttributes<HTMLSpanElement>;

export default function Tag({ className, children }: TagProps) {
  return (
    <span
      title={children?.toString()}
      className={clsx(
        `rounded-full px-2 py-1 bg-indigo-400 text-custom__gray min-w-0
         overflow-hidden text-ellipsis max-w-[4rem] w-full
        text-center font-semibold text-xs uppercase`,
        className
      )}
    >
      {children}
    </span>
  );
}
