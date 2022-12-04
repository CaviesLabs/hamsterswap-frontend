import {
  ChangeEventHandler,
  FC,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setProposal } from "@/src/redux/actions/proposal/proposal.action";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { SolanaIcon } from "@/src/components/icons";

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

export const AddSolModal: FC<AddItemModalProps> = (props) => {
  const dispatch = useDispatch();
  const proposal = useSelector((state: any) => state.proposal);
  const swapItems = useSelector((state: any) => state.proposal?.swapItems);
  const [value, setValue] = useState("");
  const [mySolBalance] = useState("2043.54");
  const myRemainSolBalance = useMemo(() => {
    let result: number = +mySolBalance;
    if (!isNaN(result)) {
      swapItems.forEach((i: any) => {
        if (i.assetType === "token") {
          result -= i.value;
        }
      });
    }
    return `${Math.round(+result * 100000000) / 100000000}`;
  }, [mySolBalance, proposal, swapItems]);

  const handleChangeSolValue: ChangeEventHandler<HTMLInputElement> = (e: {
    target: { value: string | SetStateAction<string> };
  }) => {
    if (!isNaN(+e.target.value)) {
      if (decimalCount(+e.target.value) > 8) {
        const val = `${Math.round(+e.target.value * 100000000) / 100000000}`;
        setValue(val);
      } else {
        setValue(`${e.target.value}`);
      }
    } else {
      setValue(`${e.target.value}`);
    }
  };

  const handleAddSol = (e: any) => {
    if (!value) return;
    if (value === "") return;
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return;
    if (+value !== parseFloat(value)) return;
    if (+value > +myRemainSolBalance) return;

    const newSwapItems: any = swapItems;
    newSwapItems.push({
      assetType: "token",
      name: `${value} SOL`,
      collection: "SOL",
      image: "/assets/images/solana-icon.svg",
      value,
    });
    dispatch(
      setProposal({
        ...proposal,
        swapItems: newSwapItems,
      })
    );
    setValue("");
    props.handleCancel(e);
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
              value={value}
              // onChange={(e) => setValue(e.target.value)}
              onChange={handleChangeSolValue}
            />

            <div className="text-lg regular-text flex items-center mt-5">
              <p>Your balance:</p>
              <SolanaIcon className="ml-3 mr-2" />
              {myRemainSolBalance} SOL
            </div>

            <div className="mt-14 w-1/2 ml-auto">
              <button
                disabled={
                  !value ||
                  parseFloat(value) === 0 ||
                  isNaN(parseFloat(value)) ||
                  +value !== parseFloat(value) ||
                  +value > +myRemainSolBalance
                }
                type="button"
                onClick={handleAddSol}
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
