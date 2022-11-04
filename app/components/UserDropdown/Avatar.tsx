type Props = {
  width: number;
  height: number;
};

export function Avatar({ width, height }: Props) {
  return (
    <img
      src="/images/avatar.webp"
      width={width}
      height={height}
      alt="user avatar"
      className="rounded-full"
    />
  );
}
