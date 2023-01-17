import {
  ChangeEventHandler,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Input, Modal, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { useConnectedWallet } from "@saberhq/use-solana";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { DropdownIcon } from "@/src/components/icons";
import { useWallet } from "@/src/hooks/useWallet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WSOL_ADDRESS } from "@/src/utils/constants";
import { splService } from "@/src/services/spl.service";
import { SUPPORTED_TOKEN, TokenItem } from "../token-select-item";
import { AddItemModalProps } from "./types";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { SwapItemType } from "@/src/entities/proposal.entity";
import UtilsProvider from "@/src/utils/utils.provider";

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
    handleAddSol(mintAddress: string, value: string, decimal: number): void;
    addInOwner?: boolean | true;
  }
> = (props) => {
  const { solBalance } = useWallet();
  const wallet = useConnectedWallet();
  const proposal = useSelector((state: any) => state.proposal);
  const [value, setValue] = useState("");
  const { offferedItems } = useCreateProposal();

  /**
   * @dev The condition to display filter for user to select which token want to excute.
   */
  const [dropDown, setDropdown] = useState(false);

  /**
   * @dev The token address which user select.
   */
  const [addressSelected, setAddressSelected] = useState(WSOL_ADDRESS);

  /**
   * @dev The list contains balances of tokens which app support.
   */
  const [balances, setBalances] = useState<
    { address: string; balance: number }[]
  >([]);

  const myRemainCurrencyBalance = useMemo(() => {
    let result: number = +(
      balances.find((item) => item.address === addressSelected)?.balance || 0
    );

    if (!isNaN(result)) {
      offferedItems?.forEach((i: any) => {
        if (
          i?.assetType === SwapItemType.CURRENCY &&
          i?.nft_address === addressSelected
        ) {
          result -= i?.tokenAmount;
        }
      });
    }

    return `${+result}`;
  }, [proposal, offferedItems, addressSelected, balances]);

  const handleChangeSolValue: ChangeEventHandler<HTMLInputElement> = (e: {
    target: { value: number | SetStateAction<string> };
  }) => {
    if (e.target.value > myRemainCurrencyBalance && props.addInOwner) return;
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

  const handleGetBalanceOfSupportedCurrency = useCallback(async () => {
    /**
     * @dev Request to solana mainet to get balance of each currency.
     */
    const balances = await Promise.all(
      SUPPORTED_TOKEN.map(async (token) => {
        /**
         * @dev If token is native solana, return native balance in hook.
         */
        if (token.address === WSOL_ADDRESS) {
          return {
            balance: solBalance / LAMPORTS_PER_SOL,
            address: token.address,
          };
        }

        /**
         * @dev Request to mainet solana to get balance of token.
         */
        const balance = await splService.getBalance(
          wallet?.publicKey?.toString(),
          token.address
        );

        /**
         * @dev Return needed schema.
         */
        return { balance, address: token.address };
      })
    );

    /**
     * @dev Update balances state.
     */
    setBalances(balances);
  }, [wallet, solBalance]);

  useEffect(() => {
    if (wallet?.publicKey?.toString()) {
      handleGetBalanceOfSupportedCurrency();
    }
  }, [wallet, solBalance]);

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
                        balance={balances[key]?.balance?.toString() || "0"}
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
                <span className="ml-1 mr-1">
                  {SUPPORTED_TOKEN.find(
                    (item) => item.address === addressSelected
                  )?.icon("5")}
                </span>
                {UtilsProvider.formatLongNumber(
                  parseFloat(myRemainCurrencyBalance)
                )}{" "}
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
                  (+value > +myRemainCurrencyBalance && props.addInOwner)
                }
                type="button"
                onClick={() =>
                  props.handleAddSol(
                    addressSelected,
                    value,
                    SUPPORTED_TOKEN.find(
                      (item) => item.address === addressSelected
                    ).decimal
                  )
                }
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
