type Props = {
  width: number;
  height: number;
};

export function Avatar({ width, height }: Props) {
  return (
    <img
      src="//unsplash.it/40/40"
      width={width}
      height={height}
      alt="user avatar"
      className="rounded-full"
    />
  );
}
