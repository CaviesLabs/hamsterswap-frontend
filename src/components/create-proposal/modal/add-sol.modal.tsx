import {
  ChangeEventHandler,
  FC,
  SetStateAction,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Input, Modal, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { SolanaIcon, DropdownIcon, CheckIcon } from "@/src/components/icons";
import { useWallet } from "@/src/hooks/useWallet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  WSOL_ADDRESS,
  BONK_ADDRESS,
  USDC_ADDRESS,
} from "@/src/utils/constants";

type TokenItemProps = {
  name: string;
  symbol?: string;
  address: string;
  icon(size: string): ReactNode;
};

export const SUPPORTED_TOKEN: TokenItemProps[] = [
  {
    name: "SOLANA",
    address: WSOL_ADDRESS,
    symbol: "SOL",
    icon: (size: string) => (
      <img src="/assets/images/solana.svg" className={`w-${size} h-${size}`} />
    ),
  },
  {
    name: "BONK",
    address: BONK_ADDRESS,
    symbol: "BONK",
    icon: (size: string) => (
      <img src="/assets/images/bonk.svg" className={`w-${size} h-${size}`} />
    ),
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: USDC_ADDRESS,
    icon: (size: string) => (
      <img src="/assets/images/usdc.svg" className={`w-${size} h-${size}`} />
    ),
  },
];

interface TokenItemComponentProps extends TokenItemProps {
  onClick(address: string): void;
  check: boolean;
}

export const TokenItem: FC<TokenItemComponentProps> = (props) => {
  return (
    <div
      className="flow-root items-center pb-[20px] pt-[10px] border-b-solid border-b-[1px] border-b-[#E2E8F0]"
      onClick={() => props.onClick(props.address)}
    >
      <div className="float-left">{props.icon("48")}</div>
      <div className="float-left pl-[20px]">
        <p className="text-[16px] regular-text uppercase">{props.name}</p>
        <p className="text-[#5F6C87] text-[12px]">Balance: 20</p>
      </div>
      {props.check && (
        <div className="float-right">
          <CheckIcon className="relative top-[15px]" />
        </div>
      )}
    </div>
  );
};

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

  /**
   * @dev The condition to display filter for user to select which token want to excute.
   */
  const [dropDown, setDropdown] = useState(false);

  /**
   * @dev The token address which user select.
   */
  const [addressSelected, setAddressSelected] = useState(WSOL_ADDRESS);

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
      title={<p className="text-2xl">Add Token</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      destroyOnClose={true}
      className="hamster-modal"
    >
      <StyledModal>
        <div className="pt-6 relative">
          <div className="mx-auto items-center max-w-3xl">
            <div className="relative">
              <Input
                data-dropdown-toggle="dropdown"
                size="large"
                className="rounded-2xl p-3 mt-2"
                placeholder="Enter SOL amount"
                prefix={SUPPORTED_TOKEN.find(
                  (item) => item.address === addressSelected
                )?.icon("10")}
                type="number"
                value={value}
                onChange={handleChangeSolValue}
              />
              <p
                className="absolute right-[20px] top-[30px] cursor-pointer semi-bold"
                style={{ zIndex: 3 }}
                onClick={() => setDropdown(!dropDown)}
              >
                {
                  SUPPORTED_TOKEN.find(
                    (item) => item.address === addressSelected
                  )?.name
                }
                <DropdownIcon className="float-right ml-[5px]" />
              </p>
              <Dropdown
                menu={{
                  items: SUPPORTED_TOKEN.map((item, key) => ({
                    key,
                    label: (
                      <TokenItem
                        name={item.name}
                        icon={item.icon}
                        address={item.address}
                        onClick={(address) => {
                          setDropdown(false);
                          setAddressSelected(address);
                        }}
                        check={item.address === addressSelected}
                      />
                    ),
                  })),
                }}
                trigger={["hover"]}
                placement="bottomRight"
                arrow
                open={dropDown}
                onOpenChange={(v) => setDropdown(v)}
              >
                <div></div>
              </Dropdown>
            </div>

            {props.addInOwner && (
              <div className="text-[16px] regular-text flex items-center mt-5">
                <p>Your balance:</p>
                <SolanaIcon className="ml-3 mr-2" />
                {myRemainSolBalance}{" "}
                {
                  SUPPORTED_TOKEN.find(
                    (item) => item.address === addressSelected
                  )?.symbol
                }
              </div>
            )}

            <div className="mt-14 w-[234px] ml-auto">
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
