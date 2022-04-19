import { Button } from '~/components/Elements/Button';
import { HamburgerIcon } from '~/components/Icons/HamburgerIcon';

type OpenMenuProps = {
  show: boolean;
  onHandleOpen: () => void;
};

export function OpenMenuButton({ onHandleOpen, show }: OpenMenuProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-700">
      <Button
        isIconWrapper
        className="w-auto"
        onClick={onHandleOpen}
        buttonType
        aria-controls="sidebar"
        aria-label="open menu"
        aria-expanded={show}
      >
        <HamburgerIcon />
      </Button>
      <span>Home</span>
    </div>
  );
}
