import { MouseEvent } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  handleOk(e: MouseEvent<HTMLElement> | string): void;
  handleCancel(e: MouseEvent<HTMLElement>): void;
  isLoading?: boolean;
};

export type AddItemModalProps = ModalProps;

export type AddExpectedItemModalProps = ModalProps & {
  index: number;
};
