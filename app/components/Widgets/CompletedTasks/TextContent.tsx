type TextContentProps = {
  completed: number;
  total: number;
};

export function TextContent({ completed, total }: TextContentProps) {
  return (
    <div className="w-full">
      <p className="font-extrabold text-xl mb-2">
        Great, your progress is almost done!
      </p>
      <span className="font-semibold text-sm">
        {completed} out of {total} completed
      </span>
    </div>
  );
}
