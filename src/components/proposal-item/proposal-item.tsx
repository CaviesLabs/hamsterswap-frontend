import { FC, useState, useEffect } from "react";
import { ProposalItemProps } from "./types";
import { UserAvatarCardItem } from "@/src/components/user-card";
import { RowNftItem, RowNftItemProps } from "@/src/components/nfts";
import { utilsProvider } from "@/src/utils/utils.provider";
import { StyledProposalItem } from "./proposal-item.style";
import { Button } from "@hamsterbox/ui-kit";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import State from "@/src/redux/entities/state";
import { TwoWayArrowIcon } from "@/src/components/icons";

export const ProposalItem: FC<ProposalItemProps> = (props) => {
  /**
   * @dev Define value to display option.
   */
  const [optionSelected, setOptionSelected] = useState(0);
  const profile = useSelector((state: State) => state.hPublicProfile);

  /***
   * @dev Call onChange event when option changed.
   */
  useEffect(
    () => props.changeOption && props.changeOption(optionSelected),
    [optionSelected]
  );

  return (
    <StyledProposalItem
      className="w-full bg-[#F8F9FE] min-h-[200px] rounded-[32px] mb-[46px]"
      data-label={props.isGuaranteedPayment && "Warranty"}
      {...props}
    >
      {props.isGuaranteedPayment && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 3 }}
          className="absolute right-0 left-[20px] md:left-[initial] md:right-[86px] w-[37px] top-[40px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C11.8733 2 11.7494 2.03642 11.6439 2.10468C9.21698 3.69534 6.45056 4.73004 3.55286 5.13088C3.3995 5.15196 3.25912 5.22616 3.15754 5.33984C3.05597 5.45352 3.00002 5.59903 3 5.74961V11.3745C3 16.2369 5.96743 19.7869 11.7686 21.9581C11.9175 22.014 12.0825 22.014 12.2314 21.9581C18.0339 19.7869 21 16.2382 21 11.3745V5.74961C21 5.59922 20.9443 5.45386 20.8429 5.34021C20.7416 5.22655 20.6016 5.15223 20.4484 5.13088C17.5503 4.73022 14.7834 3.69552 12.3561 2.10468C12.2506 2.03642 12.1267 2 12 2ZM16.2692 10.7431C16.6796 10.3735 16.7127 9.7412 16.3431 9.33081C15.9735 8.92041 15.3412 8.88733 14.9308 9.25691L11.1469 12.6645L9.05641 10.8456C8.63976 10.4831 8.00812 10.5269 7.6456 10.9436C7.28307 11.3602 7.32694 11.9919 7.74359 12.3544L10.5019 14.7544C10.8831 15.0861 11.452 15.0813 11.8275 14.7431L16.2692 10.7431Z"
            fill="white"
          />
        </svg>
      )}
      <div className="relative bg-[#F8F9FE] w-full h-full min-h-[200px] rounded-[32px] pb-[50px]">
        <div className="px-24">
          {props.isGuaranteedPayment && (
            <div className="pt-12">
              <UserAvatarCardItem
                avatar={profile?.avatar}
                orders={profile?.ordersStat.orders}
                completion={profile?.ordersStat.completedOrders}
                reputation={true}
                walletAddress={utilsProvider.makeShort(
                  profile?.walletAddress,
                  4
                )}
              />
            </div>
          )}
          <Row className="pt-[40px]">
            <Col span={10}>
              <div className="semi-bold text-[16px] h-[36px] leading-9">
                I have
              </div>
            </Col>
            <Col offset={4} span={10}>
              <div className="flex justify-between">
                <div className="semi-bold text-[16px] leading-9">
                  looking for
                </div>
                <div className="flex">
                  {props.receiveItems.length > 1 &&
                    props.receiveItems.map((_, index) => (
                      <div className="ml-3" key={`ml3dix-${index}`}>
                        <Button
                          className="!rounded-3xl !px-4 uppercase"
                          size="small"
                          shape={
                            optionSelected === index ? "primary" : "secondary"
                          }
                          text={`Option ${index + 1}`}
                          onClick={() => setOptionSelected(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={10}>
              {props.swapItems.map((item: RowNftItemProps, index) => (
                <div className="mb-4" key={`proposal-item-${index}`}>
                  <RowNftItem {...item} />
                </div>
              ))}
            </Col>
            <Col span={4} className="flex justify-center items-center">
              <div className="rounded-full bg-white p-[18px]">
                <TwoWayArrowIcon className="w-6" />
              </div>
            </Col>
            <Col span={10}>
              {props.receiveItems[optionSelected]?.map(
                (item: RowNftItemProps, index: number) => (
                  <div className="mb-4" key={`swapoptions-${index}`}>
                    <RowNftItem {...item} />
                  </div>
                )
              )}
            </Col>
          </Row>
        </div>
      </div>
    </StyledProposalItem>
  );
};
