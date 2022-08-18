import { Button } from '~/components/Elements/Button';
import { HamburgerIcon } from '~/components/Icons/HamburgerIcon';

type OpenMenuProps = {
  show: boolean;
  onHandleOpen: () => void;
};

export function OpenMenuButton({ onHandleOpen, show }: OpenMenuProps) {
  return (
    <Button
      className="w-auto border-transparent dark:border-transparent"
      onClick={onHandleOpen}
      buttonType
      aria-controls="sidebar"
      aria-label="open sidebar"
      aria-expanded={show}
    >
      <HamburgerIcon />
    </Button>
  );
}
