const content: Record<string, string> = {
  0: "You're just getting started!",
  25: "You're on a great pace",
  50: "You're halfway done",
  75: "You're almost there",
  100: "Great you're all done",
};

function getTextContent(percentage: number) {
  return Object.keys(content).reduce((acc, value) => {
    return Math.abs(Number(value) - percentage) <
      Math.abs(Number(acc) - percentage)
      ? value
      : acc;
  });
}

type Props = {
  completed: number;
  total: number;
  percentage: number;
};

export function TextContent({ completed, total, percentage }: Props) {
  const textContentKey = getTextContent(percentage);

  return (
    <div className="w-full">
      <p className="font-extrabold text-xl mb-2">{content[textContentKey]}</p>
      <span className="font-semibold text-sm">
        {completed} out of {total} completed
      </span>
    </div>
  );
}
