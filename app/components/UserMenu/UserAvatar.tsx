type UserAvatarProps = {
  width: number;
  height: number;
};

export function UserAvatar({ width, height }: UserAvatarProps) {
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
