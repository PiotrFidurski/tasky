import { useState } from 'react';

export enum Modals {
  ALERT_MODAL = 'ALERT_MODAL',
  DESTROY_DRAFT_MODAL = 'DESTROY_DRAFT_MODAL',
  DELETE_TASK_MODAL = 'DELETE_TASK_MODAL',
}

export function useAlertBeforeAction(
  modalType: Modals,
  initialValue?: boolean
) {
  const [open, setOpen] = useState({
    ALERT_MODAL: false,
    DELETE_TASK_MODAL: initialValue || false,
    DESTROY_DRAFT_MODAL: initialValue || false,
  });

  const toggleAction = () => {
    setOpen((prevOpen) => ({ ...prevOpen, [modalType]: !prevOpen[modalType] }));
  };

  const toggleAlert = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      ALERT_MODAL: !prevOpen.ALERT_MODAL,
      [modalType]: initialValue,
    }));
  };

  return { open, setOpen, toggleAction, toggleAlert };
}
