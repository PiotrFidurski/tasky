import { Menu } from './Menu';

export function DesktopSidebar() {
  return (
    <div className="bg-light dark:bg-slate-900 w-full h-full hidden md:block max-w-[16rem] fixed top-0 left-0 font-semibold text-xl">
      <Menu visible isMobile={false} />
    </div>
  );
}
