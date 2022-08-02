import { twMerge } from 'tailwind-merge';

import { ReactNode } from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  errorMessage: string | string[];
  icon?: ReactNode;
  labelName: string;
};

export function TextArea({
  children,
  errorMessage,
  className,
  labelName,
  icon,
  ...htmlTextAreaProps
}: TextAreaProps) {
  return (
    <textarea
      rows={4}
      placeholder="Enter new task"
      className={twMerge(
        'w-full bg-primary text-xl placeholder-textGray dark:bg-secondary resize-none text-secondary dark:text-primary caret-secondary dark:caret-primary outline-none',
        className
      )}
      {...htmlTextAreaProps}
    />
  );
}
