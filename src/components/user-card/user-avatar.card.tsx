import { FC } from "react";
import { UserAvatarCardItemProps } from "./types";
import { ReputationCard } from "./repuation.card";

export const UserAvatarCardItem: FC<UserAvatarCardItemProps> = (props) => {
  return (
    <div className="flex items-center">
      <div className="left">
        <img
          src="/assets/images/sample-avatar.png"
          alt="User avatar"
          className="rounded-[50%] w-[44px] h-[44px]"
        />
      </div>
      <div className="left pl-[20px]">
        <div className="flex items-center">
          <p className="left text-[18px] text-bold semi-bold">
            {props.walletAddress}
          </p>
          <div className="left ml-[10px]">
            <ReputationCard />
          </div>
        </div>
        <div className="">
          <div className="flex items-center">
            <span className="regular-text text-dark60 left">
              {props.orders} orders
            </span>
            <div className="w-[4px] h-[4px] rounded-[50%] bg-dark60 left mx-[6px]"></div>
            <span className="regular-text text-dark60 left">
              {props.completion}% completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
