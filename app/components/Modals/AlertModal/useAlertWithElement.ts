import { useState } from 'react';

type Props = {
  initialElementState?: boolean;
};

export function useAlertWithElement({ initialElementState }: Props = {}) {
  const [open, setOpen] = useState({
    alert: false,
    element: initialElementState || false,
  });

  const toggleElement = () => {
    setOpen((state) => ({
      alert: state.alert,
      element: !state.element,
    }));
  };

  const toggleAlert = () => {
    setOpen((state) => ({
      alert: !state.alert,
      element: state.element || false,
    }));
  };

  return { open, toggleElement, toggleAlert };
}
