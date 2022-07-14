import * as Dialog from '@radix-ui/react-dialog';

import { useNavigate } from 'remix';

import { modalContent, modalOverlay } from '../classNames';
import { Header } from '../components/Header';

export function EditTask() {
  const navigate = useNavigate();

  const handleOpenChange = () => {
    navigate(-1);
  };

  return (
    <Dialog.Root defaultOpen onOpenChange={handleOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlay} />
        <Dialog.Content className={modalContent}>
          <Header srDescription="Create task dialog" shouldSubmitOnClose>
            Create task
          </Header>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
