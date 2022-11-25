import { FC, useState, useMemo } from "react";
import { ProposalItemProps } from "./types";
import { UserAvatarCardItem } from "@/src/components/user-card";
import { RowNftItem } from "@/src/components/nfts";
import { utilsProvider } from "@/src/utils/utils.provider";
import { StyledProposalItem } from "./proposal-item.style";
import { Button } from "@hamsterbox/ui-kit";
import classnames from "classnames";

export const ProposalItem: FC<ProposalItemProps> = (props) => {
  /**
   * @dev Define value to display option.
   */
  const [optionSelected, setOptionSelected] = useState(0);

  /**
   * @dev Swap options.
   */
  const swapOptions = useMemo(
    () => [
      [
        {
          name: "#911",
          collection: "Maya Spirits",
          image:
            "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
          nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
          collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        },
      ],
      [
        {
          name: "#911",
          collection: "Maya Spirits",
          image:
            "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
          nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
          collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        },
        {
          name: "#911",
          collection: "Maya Spirits",
          image:
            "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
          nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
          collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        },
      ],
      [
        {
          name: "#911",
          collection: "Maya Spirits",
          image:
            "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
          nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
          collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        },
      ],
    ],
    []
  );

  return (
    <StyledProposalItem
      className="w-full bg-dark10 min-h-[200px] rounded-[32px] rounded-[32px] mb-[46px]"
      data-label={props.userInfoHidden ? "" : "Guaranteed payment"}
      {...props}
    >
      {!props.userInfoHidden && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 3 }}
          className="absolute right-0 left-[20px] md:left-[initial] md:right-[143px] w-[37px] top-[42px]"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C11.8733 2 11.7494 2.03642 11.6439 2.10468C9.21698 3.69534 6.45056 4.73004 3.55286 5.13088C3.3995 5.15196 3.25912 5.22616 3.15754 5.33984C3.05597 5.45352 3.00002 5.59903 3 5.74961V11.3745C3 16.2369 5.96743 19.7869 11.7686 21.9581C11.9175 22.014 12.0825 22.014 12.2314 21.9581C18.0339 19.7869 21 16.2382 21 11.3745V5.74961C21 5.59922 20.9443 5.45386 20.8429 5.34021C20.7416 5.22655 20.6016 5.15223 20.4484 5.13088C17.5503 4.73022 14.7834 3.69552 12.3561 2.10468C12.2506 2.03642 12.1267 2 12 2ZM16.2692 10.7431C16.6796 10.3735 16.7127 9.7412 16.3431 9.33081C15.9735 8.92041 15.3412 8.88733 14.9308 9.25691L11.1469 12.6645L9.05641 10.8456C8.63976 10.4831 8.00812 10.5269 7.6456 10.9436C7.28307 11.3602 7.32694 11.9919 7.74359 12.3544L10.5019 14.7544C10.8831 15.0861 11.452 15.0813 11.8275 14.7431L16.2692 10.7431Z"
            fill="white"
          />
        </svg>
      )}
      <div className="relative bg-dark10 w-full h-full min-h-[200px]  rounded-[32px] pb-[50px]">
        <div className="header-section pr-[20px] pl-[20px] md:pl-[77px]">
          <div></div>
        </div>
        <div className="pl-[20px] pr-[20px] md:pl-[77px]">
          {!props.userInfoHidden && (
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
          )}
          <div className="md:flex pt-[40px]">
            <div className="block md:left w-full md:w-[50%] md:pr-[20px]">
              <div className="h-[50px]">
                <p className="semi-bold text-[16px]">I Have</p>
              </div>
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
              <div className="flow-root items-center h-[50px]">
                <p
                  className="semi-bold text-[16px] float-left"
                  style={{ transform: "translateY(50%)" }}
                >
                  Looking For
                </p>
                <div className="flex pl-[60px]">
                  {swapOptions.map((_, index) => (
                    <Button
                      className={classnames(
                        "float-right !rounded-[100px] after:!rounded-[100px] !px-[10px]",
                        { "ml-[12px]": index > 0 }
                      )}
                      size="small"
                      shape={optionSelected === index ? "primary" : "secondary"}
                      text={`Option ${index + 1}`}
                      onClick={() => setOptionSelected(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="pt-[20px]">
                {swapOptions[optionSelected].map((item, index) => (
                  <RowNftItem key={`swapoptions-${index}`} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledProposalItem>
  );
};
