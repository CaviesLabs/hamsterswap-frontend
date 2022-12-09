import { MouseEvent } from "react";
import { hProfileDto } from "@/src/dto/hProfile.dto";

export type ModalProps = {
  isModalOpen: boolean;
  handleOk(e: MouseEvent<HTMLElement>): void;
  handleCancel(e: MouseEvent<HTMLElement>): void;
  isLoading?: boolean;
};

export type BuyModalProps = ModalProps;

export type ConfirmModalProps = ModalProps & {
  buyer: hProfileDto;
  seller: hProfileDto;
};
