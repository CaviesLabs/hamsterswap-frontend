import {
  ChangeEventHandler,
  FC,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { SolanaIcon } from "@/src/components/icons";
import { useWallet } from "@/src/hooks/useWallet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const decimalCount = (num: any) => {
  // Convert to String
  const numStr = `${num}`;
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

export const AddSolModal: FC<
  AddItemModalProps & {
    handleAddSol(value: string): void;
    addInOwner?: boolean | true;
  }
> = (props) => {
  const { solBalance } = useWallet();
  const proposal = useSelector((state: any) => state.proposal);
  const swapItems = useSelector((state: any) => state.proposal?.swapItems);
  const [value, setValue] = useState("");

  const myRemainSolBalance = useMemo(() => {
    let result: number = +solBalance;
    if (!isNaN(result)) {
      swapItems?.forEach((i: any) => {
        if (i.assetType === "token") {
          result -= i.value;
        }
      });
    }
    return `${Math.round(+result) / LAMPORTS_PER_SOL}`;
  }, [solBalance, proposal, swapItems]);

  const handleChangeSolValue: ChangeEventHandler<HTMLInputElement> = (e: {
    target: { value: number | SetStateAction<string> };
  }) => {
    if (e.target.value > myRemainSolBalance && props.addInOwner) return;
    if (!isNaN(+e.target.value)) {
      if (decimalCount(+e.target.value) > 8) {
        const val = `${
          Math.round(+e.target.value * LAMPORTS_PER_SOL) / LAMPORTS_PER_SOL
        }`;
        setValue(val);
      } else {
        setValue(`${e.target.value}`);
      }
    } else {
      setValue(`${e.target.value}`);
    }
  };

  return (
    <Modal
      title={<p className="text-2xl">Add SOL</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter SOL amount"
              prefix={<SolanaIcon />}
              suffix="SOL"
              type="number"
              value={value}
              onChange={handleChangeSolValue}
            />

            {props.addInOwner && (
              <div className="text-lg regular-text flex items-center mt-5">
                <p>Your balance:</p>
                <SolanaIcon className="ml-3 mr-2" />
                {myRemainSolBalance} SOL
              </div>
            )}

            <div className="mt-14 w-1/2 ml-auto">
              <button
                disabled={
                  !value ||
                  parseFloat(value) === 0 ||
                  isNaN(parseFloat(value)) ||
                  +value !== parseFloat(value) ||
                  (+value > +myRemainSolBalance && props.addInOwner)
                }
                type="button"
                onClick={() => props.handleAddSol(value)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
