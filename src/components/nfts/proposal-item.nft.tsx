import { FC } from "react";
import { RowNftItemProps } from "./types";
import { Button } from "@hamsterbox/ui-kit";
import { useRouter } from "next/router";

export const ProposalItem: FC<RowNftItemProps> = (props) => {
  const router = useRouter();

  return (
    <div className="md:left w-full mb-[20px] cursor-pointer">
      <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 flex items-center">
        <div className="left pl-[2px]">
          <img
            src={props.image}
            alt="NFT image"
            className="h-full w-[72px] object-cover rounded-[8px]"
          ></img>
        </div>
        <div className="px-4 w-72 left">
          <span className="text-gray-400 mr-3 uppercase text-xs">Nft Name</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {props.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {props.collection}
            </p>
          </div>
        </div>
        <div className="ml-auto left mr-[20px]">
          <a href="#">
            <Button
              text="View details"
              size="small"
              onClick={() => router.push("/proposal/2")}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
