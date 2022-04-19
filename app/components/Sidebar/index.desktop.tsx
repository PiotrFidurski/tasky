import { Menu } from './Menu';

export function DesktopSidebar() {
  return (
    <div className="relative w-full h-full hidden md:block">
      <Menu show onHandleClose={() => {}} isMobile={false} />
    </div>
  );
}
