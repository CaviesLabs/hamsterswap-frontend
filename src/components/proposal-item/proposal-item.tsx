import { FC } from "react";
import { ProposalItemProps } from "./types";
import { UserAvatarCardItem } from "@/src/components/user-card";
import { RowNftItem } from "@/src/components/nfts";
import { utilsProvider } from "@/src/utils/utils.provider";

export const ProposalItem: FC<ProposalItemProps> = () => {
  return (
    <div
      className="w-full bg-dark10 min-h-[200px] rounded-[32px] badge-card rounded-[32px] mb-[46px]"
      data-label="Guaranteed payment"
    >
      <img
        src="/assets/images/security.svg"
        alt="security-icon"
        className="absolute right-0 left-[20px] md:left-[initial] md:right-[143px] w-[37px] top-[42px]"
        style={{ zIndex: 3 }}
      />
      <div className="relative bg-dark10 w-full h-full min-h-[200px]  rounded-[32px] pb-[50px]">
        <div className="header-section pr-[20px] pl-[20px] md:pl-[77px]">
          <div></div>
        </div>
        <div className="pl-[20px] pr-[20px] md:pl-[77px]">
          <div className="pt-[120px] md:pt-[32px]">
            <UserAvatarCardItem
              avatar="https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg"
              orders={917}
              completion={99.9}
              reputation={true}
              walletAddress={utilsProvider.makeShort(
                "F8qedeJsnrFnLfKpT4QN3GeAQqQMtq4izNLR1dKb5eRS",
                4
              )}
            />
          </div>
          <div className="md:flex pt-[40px]">
            <div className="block md:left w-full md:w-[50%] md:pr-[20px]">
              <p className="semi-bold text-[16px]">I have</p>
              <div className="pt-[20px]">
                <RowNftItem
                  name="#2332"
                  collection="Maya Spirits"
                  image="https://i.seadn.io/gae/M1L6jf3EZJZ0ep-0XPA6HxAWH1flQXwgkKwdHVabbMMCVyCBd3cwcwXLl9ZR8vEDFBQ0fbbA1bPUQY2T7t0xpomrS6LwhPVZ4d5jAw?auto=format&w=1000"
                  nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                  collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                />
                <RowNftItem
                  name="#2332"
                  collection="Maya Spirits"
                  image="https://i.seadn.io/gae/M1L6jf3EZJZ0ep-0XPA6HxAWH1flQXwgkKwdHVabbMMCVyCBd3cwcwXLl9ZR8vEDFBQ0fbbA1bPUQY2T7t0xpomrS6LwhPVZ4d5jAw?auto=format&w=1000"
                  nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                  collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                />
                <RowNftItem
                  name="#2332"
                  collection="Maya Spirits"
                  image="https://i.seadn.io/gae/M1L6jf3EZJZ0ep-0XPA6HxAWH1flQXwgkKwdHVabbMMCVyCBd3cwcwXLl9ZR8vEDFBQ0fbbA1bPUQY2T7t0xpomrS6LwhPVZ4d5jAw?auto=format&w=1000"
                  nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                  collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                />
              </div>
            </div>
            <div className="block md:left w-full md:w-[50%] md:pl-[20px]">
              <p className="semi-bold text-[16px]">want swap to</p>
              <div className="pt-[20px]">
                <RowNftItem
                  name="#911"
                  collection="Maya Spirits"
                  image="https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750"
                  nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                  collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                />
                <RowNftItem
                  name="#9924"
                  collection="Monomyth"
                  image="https://i.seadn.io/gae/KKMSj66V6UHOYJyub4i9R-VqPvVvgiXS97MIRMDoJ2fKrqnYWdvPhtwpdhVf9QRkFuj5zw6Xp9x0JIvkhMfNNg_1Sj_5DoZ3k8dQ0Q?auto=format&w=750"
                  nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                  collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
