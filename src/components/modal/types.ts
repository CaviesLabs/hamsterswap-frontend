import { MouseEvent } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  isLoading?: boolean;
  handleOk(e?: MouseEvent<HTMLElement>): void | Promise<void>;
  handleCancel(e?: MouseEvent<HTMLElement>): void | Promise<void>;
};

export type NftDetailsModalProps = ModalProps & {
  address: string;
  tokenId: number;
};

export type AttributeProps = {
  title: string;
  value: string;
  percent: string;
  solAmount: string | number;
};
