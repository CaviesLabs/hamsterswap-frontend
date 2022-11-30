import { FC, useState } from "react";
import { useRouter } from "next/router";
import { UserAvatarCardItem } from "@/src/components/user-card";
import { utilsProvider } from "@/src/utils/utils.provider";
import { StyledProposalItem } from "@/src/components/proposal-item/proposal-item.style";
import { Button } from "@hamsterbox/ui-kit";
import classnames from "classnames";
import { Col, Row } from "antd";
import ProposalItems from "@/src/components/proposal-item/proposal-items";
import { CancelProposalModal } from "@/src/components/user/modal/cancel-proposal.modal";
import { mockHaves, mockSwapOptions } from "@/src/utils";
import { ProposalDetailProps } from "./types";
import { CanceledProposalModal } from "@/src/components/user/modal/canceled-proposal.modal";
import { WithdrewProposalModal } from "@/src/components/user/modal/withdrew-proposal.modal";

export const ProposalDetail: FC<ProposalDetailProps> = (props) => {
  const { status } = props;
  const router = useRouter();
  const [cancelModal, setCancelModal] = useState(false);
  const [canceledModal, setCanceledModal] = useState(false);
  const [withdrewModal, setWithdrewModal] = useState(false);

  return (
    <StyledProposalItem
      className="w-full bg-dark10 min-h-[200px] rounded-[32px] rounded-[32px] mb-[46px]"
      data-label={props.isGuaranteedPayment && "Guaranteed payment"}
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
          className="absolute right-0 left-[20px] md:left-[initial] md:right-[143px] w-[37px] top-[42px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C11.8733 2 11.7494 2.03642 11.6439 2.10468C9.21698 3.69534 6.45056 4.73004 3.55286 5.13088C3.3995 5.15196 3.25912 5.22616 3.15754 5.33984C3.05597 5.45352 3.00002 5.59903 3 5.74961V11.3745C3 16.2369 5.96743 19.7869 11.7686 21.9581C11.9175 22.014 12.0825 22.014 12.2314 21.9581C18.0339 19.7869 21 16.2382 21 11.3745V5.74961C21 5.59922 20.9443 5.45386 20.8429 5.34021C20.7416 5.22655 20.6016 5.15223 20.4484 5.13088C17.5503 4.73022 14.7834 3.69552 12.3561 2.10468C12.2506 2.03642 12.1267 2 12 2ZM16.2692 10.7431C16.6796 10.3735 16.7127 9.7412 16.3431 9.33081C15.9735 8.92041 15.3412 8.88733 14.9308 9.25691L11.1469 12.6645L9.05641 10.8456C8.63976 10.4831 8.00812 10.5269 7.6456 10.9436C7.28307 11.3602 7.32694 11.9919 7.74359 12.3544L10.5019 14.7544C10.8831 15.0861 11.452 15.0813 11.8275 14.7431L16.2692 10.7431Z"
            fill="white"
          />
        </svg>
      )}
      <div className="relative bg-dark10 w-full h-full min-h-[200px]  rounded-[32px] pb-[50px]">
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
          <ProposalItems
            userAssets={mockHaves}
            userLookingFor={mockSwapOptions}
          />
          <Row className="pt-10 md:px-10" gutter={20}>
            <Col span={status === "pending" ? 12 : 24}>
              <div className="md:left">
                <p className="semi-bold text-[16px] h-[36px] leading-9">Note</p>
                <p className="mt-[12px] text-[16px] regular-text">
                  If you have the items which are the same with my proposal
                  items, you can text me to discuss and swap them
                </p>
                <p className="mt-[12px] text-[16px] regular-text text-dark60">
                  Expiration date: 12 Dec, 2022 11:06
                </p>
                <p className="mt-[12px] text-[16px] regular-text text-dark60">
                  Status:{" "}
                  {status === "success" ? (
                    <span className="text-green font-bold">Swap Success</span>
                  ) : (
                    <span className="text-red-500 font-bold capitalize">
                      {status}
                    </span>
                  )}
                </p>
                {status === "expired" && (
                  <div className="mt-4">
                    <Button
                      onClick={() => setWithdrewModal(true)}
                      shape="secondary"
                      text="Withdraw"
                    />
                    <WithdrewProposalModal
                      isModalOpen={withdrewModal}
                      handleCancel={() => setWithdrewModal(false)}
                      handleOk={() => setWithdrewModal(false)}
                    />
                  </div>
                )}
              </div>
            </Col>
            <Col span={status === "pending" ? 12 : 0}>
              <div className="md:left">
                <p className="semi-bold text-[16px] h-[36px] leading-9">
                  Warranty
                </p>
                <p className="mt-[12px] text-[16px] regular-text flex">
                  Guaranteed payment amount:
                  <img
                    src="/assets/images/solana-icon.svg"
                    alt="Solana Icon"
                    className="h-[24px] w-[24px] mx-[12px]"
                  />
                  <span className="semi-bold">300.00 SOL</span>
                </p>
              </div>
            </Col>
          </Row>
          {status === "pending" && (
            <div className="flex mt-[20px] justify-end px-10">
              <button
                className="border-red-500 text-red-500 !border-2 px-4 rounded-3xl"
                onClick={() => setCancelModal(true)}
              >
                Cancel Proposal
              </button>
              <CancelProposalModal
                isModalOpen={cancelModal}
                handleCancel={() => setCancelModal(false)}
                handleOk={() => {
                  setCancelModal(false);
                  setCanceledModal(true);
                }}
              />
              <CanceledProposalModal
                isModalOpen={canceledModal}
                handleCancel={() => setCanceledModal(false)}
                handleOk={() => setCanceledModal(false)}
              />
              <div className="ml-4">
                <Button
                  className={classnames(
                    "!rounded-[100px] after:!rounded-[100px] !px-[10px] relative"
                  )}
                  text="View on market"
                  onClick={() => router.push("/proposal/2")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledProposalItem>
  );
};
