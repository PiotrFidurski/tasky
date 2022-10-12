import { useState } from 'react';

export enum Types {
  warning = 'warning',
  DESTROY_DRAFT = 'DESTROY_DRAFT',
  DELETE_TASK = 'DELETE_TASK',
}

export function useAlertBeforeAction(action: Types) {
  const [open, setOpen] = useState<Record<Types, boolean>>({
    warning: false,
    DELETE_TASK: false,
    DESTROY_DRAFT: false,
  });

  const toggleAction = () => {
    setOpen((prevOpen) => ({ ...prevOpen, [action]: !prevOpen[action] }));
  };

  const toggleAlert = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      warning: !prevOpen.warning,
      [action]: false,
    }));
  };

  return { open, setOpen, toggleAction, toggleAlert };
}
