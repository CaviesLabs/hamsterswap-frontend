import { FC } from "react";
import { UserAvatarCardItemProps } from "./types";
import { ReputationCard } from "./repuation.card";
import { useRouter } from "next/router";

export const UserAvatarCardItem: FC<UserAvatarCardItemProps> = (props) => {
  const { id, avatar, walletAddress, orders, completion } = props;
  const router = useRouter();
  return (
    <div className="flex items-center">
      <div
        className="left cursor-pointer"
        onClick={() => router.push(id ? `/u/${id}/profile` : "/#")}
      >
        <img
          src={avatar || "/assets/images/sample-avatar.png"}
          alt="User avatar"
          className="rounded-[50%] w-[44px] h-[44px]"
        />
      </div>
      <div className="left pl-[20px]">
        <div className="flex items-center">
          <div
            onClick={() => router.push(id ? `/u/${id}/profile` : "/#")}
            className="left text-[18px] semi-bold text-[#735CF7] cursor-pointer"
          >
            {walletAddress}
          </div>
          <div className="left ml-[10px]">
            <ReputationCard />
          </div>
        </div>
        <div className="mt-1">
          <div className="flex items-center text-[14px]">
            <span className="regular-text text-dark60 left">
              {orders} orders
            </span>
            <div className="w-[4px] h-[4px] rounded-[50%] bg-dark60 left mx-[6px]"></div>
            <span className="regular-text text-dark60 left">
              {completion}% completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
