import { useState } from 'react';

export enum Modals {
  ALERT_MODAL = 'ALERT_MODAL',
  DESTROY_DRAFT_MODAL = 'DESTROY_DRAFT_MODAL',
  DELETE_TASK_MODAL = 'DELETE_TASK_MODAL',
}

export function useAlertBeforeAction(modalType: Modals) {
  const [open, setOpen] = useState({
    ALERT_MODAL: false,
    DELETE_TASK_MODAL: false,
    DESTROY_DRAFT_MODAL: false,
  });

  const toggleAction = () => {
    setOpen((prevOpen) => ({ ...prevOpen, [modalType]: !prevOpen[modalType] }));
  };

  const toggleAlert = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      warning: !prevOpen.ALERT_MODAL,
      [modalType]: false,
    }));
  };

  return { open, setOpen, toggleAction, toggleAlert };
}
