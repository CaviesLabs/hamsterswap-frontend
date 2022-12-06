import { utilsProvider } from "@/src/utils";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { getHamsterProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useRouter } from "next/router";

const UserProfile: FC = () => {
  const dispatch = useDispatch();
  const wallet = useConnectedWallet();
  const router = useRouter();

  /**
   * @description
   * This function will fetch profile from hamster server, that include:
   * + id
   * + avatar
   * + walletAddress
   * and save it into redux-store
   */
  const profile = useSelector((state: any) => state.hProfile);
  useEffect(() => {
    dispatch(getHamsterProfile());
  }, []);

  return (
    <div
      className="relative flex items-center h-full py-[3px] px-[10px] border-solid border-[0px] border-purple rounded-[5px] cursor-pointer"
      onClick={() => router.push(`/u/${profile?.id}/profile`)}
    >
      <img
        className="w-[20px] md:w-[40px] h-[auto] mr-[10px]"
        src="https://source.boringavatars.com/beam"
        alt="Boring avatar"
      />
      <span className="text-[7px] md:text-[14px]">
        {utilsProvider.makeShort(wallet?.publicKey?.toString(), 3)}
      </span>
    </div>
  );
};

export default UserProfile;
