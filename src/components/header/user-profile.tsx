import { utilsProvider } from "@/src/utils";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { getHamsterProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useRouter } from "next/router";
import { useWallet } from "@/src/hooks/useWallet";
import { useMain } from "@/src/hooks/pages/main";
import classnames from "classnames";
import styles from "./index.module.scss";

const UserProfile: FC = () => {
  const dispatch = useDispatch();
  const wallet = useConnectedWallet();
  const router = useRouter();
  const { disconnect } = useWallet();

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
  }, [wallet]);

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
        {utilsProvider.makeShort(wallet?.publicKey?.toString(), 3)}
      </span>
      <ul className={styles["toggle-container"]}>
        <div className={styles.container}>
          <ul>
            <li onClick={() => router.push(`/u/${profile.id}/profile`)}>
              Profile Setting
            </li>
            <li onClick={disconnect} className="text-red300">
              Disconnect
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default UserProfile;
