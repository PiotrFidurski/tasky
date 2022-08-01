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
  return <textarea className={className} {...htmlTextAreaProps} />;
}
