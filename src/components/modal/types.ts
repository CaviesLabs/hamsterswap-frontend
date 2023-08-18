import { NftEntity } from "@/src/dto/nft.dto";
import { MouseEvent } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  handleOk(e?: MouseEvent<HTMLElement>): void | Promise<void>;
  handleCancel(e?: MouseEvent<HTMLElement>): void | Promise<void>;
};

export type NftDetailsModalProps = ModalProps & {
  data?: NftEntity;
};

export type AttributeProps = {
  title: string;
  value: string;
  percent: string;
  solAmount: string | number;
};
