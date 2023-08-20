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
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { DropdownIcon } from "@/src/components/icons";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WSOL_ADDRESS } from "@/src/utils/constants";
import { TokenItem } from "../token-select-item";
import { AddItemModalProps } from "./types";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { SwapItemType } from "@/src/entities/proposal.entity";
import { useMain } from "@/src/hooks/pages/main";
import { useAppWallet, useNativeBalance } from "@/src/hooks/useAppWallet";
import { TokenService } from "@/src/services/token.service";
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

export const AddTokenModal: FC<
  AddItemModalProps & {
    handleAddSol(mintAddress: string, value: string, decimal: number): void;
    addInOwner?: boolean | true;
  }
> = (props) => {
  const nativeBalance = useNativeBalance();
  const proposal = useSelector((state: any) => state.proposal);
  const {
    platformConfig: { allowCurrencies },
    chainId,
  } = useMain();
  const { walletAddress } = useAppWallet();
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
    if (
      Number.parseFloat(e.target.value as string) >
        parseFloat(myRemainCurrencyBalance) &&
      props.addInOwner
    )
      return;
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

  /**
   * @dev The function to get balance of supported currency.
   * @notice This function will be called when user change wallet address.
   * @notice Check if token is native token, we will get balance from native balance.
   * @returns {Promise<void>}
   */
  const handleGetBalanceOfSupportedCurrency = useCallback(async () => {
    const balances = await Promise.all(
      allowCurrencies.map(async (token) => ({
        address: token.address,
        balance:
          token.address === WSOL_ADDRESS
            ? nativeBalance
            : await TokenService.getService(chainId).getTokenBalanceOf(
                walletAddress,
                token.realAddress,
                token.decimals
              ),
      }))
    );

    /**
     * @dev Update balances state.
     */
    setBalances(balances);
  }, [walletAddress, nativeBalance, chainId, allowCurrencies]);

  /**
   * @dev Watch address changes and get token info.
   */
  const tokenInfo = useMemo(
    () => allowCurrencies.find((item) => item.address === addressSelected),
    [allowCurrencies, addressSelected]
  );

  useEffect(() => {
    if (!walletAddress) return;
    handleGetBalanceOfSupportedCurrency();
  }, [walletAddress, nativeBalance, allowCurrencies]);

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
                prefix={
                  <img
                    className="w-10 h-10"
                    src={
                      allowCurrencies.find(
                        (item) => item.address === addressSelected
                      )?.icon
                    }
                  />
                }
                type="number"
                value={value}
                onChange={handleChangeSolValue}
              />
              <p
                className="absolute right-[20px] top-[30px] cursor-pointer semi-bold"
                style={{ zIndex: 3 }}
                onClick={() => setDropdown(!dropDown)}
              >
                {tokenInfo?.name}
                <DropdownIcon className="float-right ml-[5px]" />
              </p>
              <Dropdown
                menu={{
                  items: allowCurrencies.map((item, key) => ({
                    key,
                    label: (
                      <TokenItem
                        name={item.name}
                        iconUrl={item.icon}
                        address={item.address}
                        balance={balances[key]?.balance?.toString() || "0"}
                        addInOwner={props.addInOwner}
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
                  <img
                    src={
                      allowCurrencies.find(
                        (item) => item.address === addressSelected
                      )?.icon
                    }
                    alt="Icon"
                    className="w-5 h-5"
                  />
                </span>
                {UtilsProvider.formatLongNumber(
                  parseFloat(myRemainCurrencyBalance)
                )}{" "}
                {tokenInfo?.name}
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
                onClick={() => {
                  /**
                   * @dev Reset amount input.
                   */
                  setValue("");

                  /**
                   * @dev Call function to add.
                   */
                  props.handleAddSol(
                    addressSelected,
                    value,
                    tokenInfo?.decimals
                  );
                }}
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