import { FC, useRef, useState } from "react";
import { DropdownArrowIcon } from "@/src/components/icons";
import { useAppWallet } from "@/src/hooks/useAppWallet";
import classnames from "classnames";
import styles from "./index.module.scss";
import useOnClickOutside from "@/src/hooks/useOnClickOutside";
import { useMain } from "@/src/hooks/pages/main";

export const ChainSelect: FC = () => {
  const { selectChain, chainInfo, defaultChains } = useMain();
  const { walletAddress } = useAppWallet();

  /**
   * @description Define state to toggle profile menu
   * @returns {void}
   */
  const [show, setShow] = useState(false);

  /**
   * @description Define ref to close profile menu when click outside
   * @returns {void}
   */
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setShow(false);
  });

  return (
    <div
      className={classnames(
        "cursor-pointer avatar-profile bg-[#CCC3FF] p-[10px] ml-[5px] mobile:mr-[20px] mobile:py-[6px] mr-[10px]",
        styles["chain-select"]
      )}
      ref={ref}
    >
      <span
        className="text-[12px] md:text-[14px] text-white flex items-center"
        onClick={() => !walletAddress && setShow(!show)}
      >
        <img className="w-[24px] h-[24px]" src={chainInfo?.logo} />
        <p className="text-[12px] md:text-[14px] text-[#20242D] flex items-center ml-2">
          {chainInfo?.name}
        </p>
        <DropdownArrowIcon className="ml-2" color="#20242D" />
      </span>
      <div
        style={{
          display: show ? "block" : "none",
        }}
        className={styles["toggle-container"]}
      >
        <div className={styles.container}>
          <ul>
            {defaultChains.map((item, key) => (
              <>
                <li
                  key={`defaultchains-${key}`}
                  onClick={() => {
                    selectChain(item.chainId);
                    setShow(false);
                  }}
                  className="hover:bg-[#F0F3FA] normal-text flex items-center p-[10px] rounded-[12px]"
                >
                  <img
                    className="w-[24px] h-[24px] rounded-[50%]"
                    src={item.logo}
                  />
                  <p className="ml-[5px]">{item.name || item.chainId}</p>
                </li>
                <div className="divider w-full h-[1px] bg-[#E2E8F0] w-[90%] mx-auto mt-[10px]"></div>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
