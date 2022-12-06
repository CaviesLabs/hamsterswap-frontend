import { MouseEvent } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  handleOk(e: MouseEvent<HTMLElement>): void;
  handleCancel(e: MouseEvent<HTMLElement>): void;
};

export type NftDetailsModalProps = ModalProps & {
  data?: any;
};

export type AttributeProps = {
  title: string;
  value: string;
  percent: string;
  solAmount: string | number;
};
