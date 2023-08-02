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
        "relative border-solid border-[0px] border-purple300 rounded-[50px] cursor-pointer avatar-profile bg-[#242636] p-[10px] ml-[5px] mobile:mr-[20px] mobile:py-[6px] mr-[10px]",
        styles["chain-select"]
      )}
      ref={ref}
    >
      <span
        className="text-[12px] md:text-[14px] text-white flex items-center"
        onClick={() => !walletAddress && setShow(!show)}
      >
        <img className="w-[24px] h-[24px]" src={chainInfo?.logo} />
        <DropdownArrowIcon className="ml-2 text-dark50" />
      </span>
      <ul
        style={{
          display: show ? "block" : "none",
          bottom: `-${defaultChains.length * 45}px`,
        }}
        className={styles["toggle-container"]}
      >
        <div className={styles.container}>
          <ul>
            {defaultChains.map((item, key) => (
              <li
                key={`kksk-${key}`}
                onClick={() => {
                  selectChain(item.chainId);
                  setShow(false);
                }}
                className="hover:text-purple normal-text flex items-center"
              >
                <img className="w-[24px] h-[24px]" src={item.logo} />
                <p className="ml-[5px]">
                  {(item.name || item.chainId).toUpperCase()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};
