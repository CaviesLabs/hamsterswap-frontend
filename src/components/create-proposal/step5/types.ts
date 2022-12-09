import { MouseEvent } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  handleOk(e?: MouseEvent<HTMLElement>): void;
  handleCancel(e?: MouseEvent<HTMLElement>): void;
  isLoading?: boolean;
};

export type SummaryProps = {
  modalOpened?: boolean;
  setModalOpened: (v: boolean) => void;
};
