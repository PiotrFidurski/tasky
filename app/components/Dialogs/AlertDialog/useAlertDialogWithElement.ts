import { useState } from 'react';

type Props = {
  initialElementState?: boolean;
};

export function useAlertDialogWithElement({
  initialElementState = false,
}: Props = {}) {
  const [open, setOpen] = useState({
    alert: false,
    element: initialElementState,
  });

  const handleToggleElement = () => {
    setOpen((state) => ({
      alert: state.alert,
      element: !state.element,
    }));
  };

  const handleToggleAlert = () => {
    setOpen((state) => ({
      alert: !state.alert,
      element: state.element || false,
    }));
  };

  return { open, handleToggleElement, handleToggleAlert };
}
