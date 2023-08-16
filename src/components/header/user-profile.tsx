import { utilsProvider } from "@/src/utils";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { getHamsterProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { useRouter } from "next/router";
import { useMain } from "@/src/hooks/pages/main";
import { useAppWallet, useDisconnectWallet } from "@/src/hooks/useAppWallet";
import classnames from "classnames";
import styles from "./index.module.scss";

const UserProfile: FC = () => {
  const { disconnect } = useDisconnectWallet();
  const { walletAddress } = useAppWallet();
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * @description
   * This function will fetch profile from hamster server, that include:
   * + id
   * + avatar
   * + walletAddress
   * and save it into redux-store
   */
  const { hProfile: profile } = useMain();

  /**
   * @dev Watch changes in wallet and get hamster profile
   */
  useEffect(() => {
    dispatch(getHamsterProfile());
  }, [walletAddress]);

  return (
    <div
      className={classnames(
        "relative flex items-center h-full py-[3px] px-[10px] border-solid border-[0px] border-purple rounded-[5px] cursor-pointer avatar-profile",
        styles["avatar-profile"]
      )}
    >
      <img
        className="w-[20px] md:w-[40px] h-[auto] mr-[10px]"
        src={profile?.avatar}
        alt="Boring avatar"
      />
      <span className="text-[7px] md:text-[14px]">
        {utilsProvider.makeShort(walletAddress, 3)}
      </span>
      <ul className={styles["toggle-container"]}>
        <div className={styles.container}>
          <ul>
            <li onClick={() => router.push(`/u/${profile.id}/profile`)}>
              Profile Setting
            </li>
            <li
              className="text-red300"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default UserProfile;
