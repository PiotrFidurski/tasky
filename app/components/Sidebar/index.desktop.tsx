import { Menu } from './Menu';

export function DesktopSidebar() {
  return (
    <div className="w-full h-full hidden md:block max-w-[16rem] fixed top-0 left-0">
      <Menu visible isMobile={false} />
    </div>
  );
}
