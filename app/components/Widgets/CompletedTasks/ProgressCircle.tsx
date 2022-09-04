type Props = {
  squareSize: number;
  strokeWidth: number;
  percentage: number;
};

export function CircularProgress({
  squareSize,
  strokeWidth,
  percentage,
}: Props) {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (squareSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${squareSize} ${squareSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg
      width={squareSize}
      height={squareSize}
      viewBox={viewBox}
      className="transition-all"
    >
      <circle
        className="stroke-custom-indigo dark:stroke-shadowSecondary"
        cx={squareSize / 2}
        cy={squareSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="circle-progress"
        cx={squareSize / 2}
        cy={squareSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${squareSize / 2} ${squareSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className="text-2xl font-extrabold fill-custom-blue dark:fill-custom-indigo stroke-transparent"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
}
