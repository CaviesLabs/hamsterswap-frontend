import { FC, ReactNode } from "react";
import { CheckIcon } from "@/src/components/icons";
import {
  WSOL_ADDRESS,
  BONK_ADDRESS,
  USDC_ADDRESS,
} from "@/src/utils/constants";

/**
 * @dev Interface for each token which hamster swap support.
 */
export type TokenItemEntity = {
  name: string;
  address: string;
  symbol?: string;
  iconUrl?: string;
  decimal?: number;
  icon?(size: string): ReactNode;
};

/**
 * @dev Tokens data which hamster swap support.
 * @var {TokenItemProps}
 */
export const SUPPORTED_TOKEN: TokenItemEntity[] = [
  {
    name: "SOLANA",
    address: WSOL_ADDRESS,
    symbol: "SOL",
    iconUrl: "/assets/images/solana.svg",
    decimal: 9,
    icon: (size: string) => (
      <img src="/assets/images/solana.svg" className={`w-${size} h-${size}`} />
    ),
  },
  {
    name: "BONK",
    address: BONK_ADDRESS,
    symbol: "BONK",
    iconUrl: "/assets/images/bonk.svg",
    decimal: 5,
    icon: (size: string) => (
      <img src="/assets/images/bonk.svg" className={`w-${size} h-${size}`} />
    ),
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: USDC_ADDRESS,
    iconUrl: "/assets/images/usdc.svg",
    decimal: 6,
    icon: (size: string) => (
      <img src="/assets/images/usdc.svg" className={`w-${size} h-${size}`} />
    ),
  },
];

/**
 * @dev Interface props token item component
 * @extends {TokenItemEntity}
 */
interface TokenItemProps extends TokenItemEntity {
  onClick(address: string): void;
  addInOwner?: boolean;
  balance: string;
  check: boolean;
}

/**
 * @dev UI component for token select.
 * @param {TokenItemProps} props
 * @returns {ReactNode}
 */
export const TokenItem: FC<TokenItemProps> = (props) => {
  return (
    <div
      className="flow-root items-center pb-[20px] pt-[10px] border-b-solid border-b-[1px] border-b-[#E2E8F0]"
      onClick={() => props.onClick(props.address)}
    >
      <div className="float-left">
        <img src={props.iconUrl} alt="Icon" className="w-[48px] h-[48px]" />
      </div>
      <div className="float-left pl-[20px]">
        <p className="text-[16px] regular-text uppercase">{props.name}</p>
        {props.addInOwner && (
          <p className="text-[#5F6C87] text-[12px]">Balance: {props.balance}</p>
        )}
      </div>
      {props.check && (
        <div className="float-right">
          <CheckIcon className="relative top-[15px]" />
        </div>
      )}
    </div>
  );
};
