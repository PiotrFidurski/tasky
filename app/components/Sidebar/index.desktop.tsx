import { Menu } from './Menu';

export function DesktopSidebar() {
  return (
    <div className="w-full h-full hidden md:block max-w-[16rem]">
      <Menu show onHandleClose={() => {}} isMobile={false} />
    </div>
  );
}
