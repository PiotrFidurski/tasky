import { useState } from 'react';

export function useWarnBeforeAction<T extends string | number>(action: T) {
  const [open, setOpen] = useState({
    warning: false,
    [action]: false,
  });

  const toggleAction = () => {
    setOpen((prevOpen) => ({ ...prevOpen, [action]: !prevOpen[action] }));
  };

  const handleWarningModalChange = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      warning: !prevOpen.warning,
      [action]: false,
    }));
  };

  return { open, setOpen, toggleAction, handleWarningModalChange };
}
