import { Menu } from './Menu';

export default function DesktopSidebar() {
  return (
    <div className="bg-light-rgba dark:bg-dark-rgba max-w-[19rem] w-full h-full hidden md:block fixed top-0 left-0">
      <Menu visible isMobile={false} />
    </div>
  );
}
