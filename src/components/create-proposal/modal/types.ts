import { MouseEvent } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  handleOk(e: MouseEvent<HTMLElement> | string, ...args: any): void;
  handleCancel(e: MouseEvent<HTMLElement>): void;
  isLoading?: boolean;
};

export type AddItemModalProps = ModalProps;

export type AddExpectedItemModalProps = ModalProps & {
  index: number;
};
