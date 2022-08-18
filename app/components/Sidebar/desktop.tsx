import { Menuv2 } from './Menu';

export function DesktopSidebar() {
  return (
    <div className="bg-light-rgba dark:bg-dark-rgba w-full h-full hidden md:block max-w-[19rem] fixed top-0 left-0 font-semibold text-xl">
      <Menuv2 visible isMobile={false} />
    </div>
  );
}
