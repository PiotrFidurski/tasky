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
    setOpen((prevState) => ({ ...prevState, element: !prevState.element }));
  };

  const toggleAlert = () => {
    setOpen((prevState) => ({
      ...prevState,
      alert: !prevState.alert,
      element: prevState.element || false,
    }));
  };

  return { open, toggleElement, toggleAlert };
}
