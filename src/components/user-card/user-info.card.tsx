import { FC, useEffect, useState } from "react";
import { UserInfoCardProps } from "./types";
import { completedOrderPercent, utilsProvider } from "@/src/utils";
import { ReputationCard } from "./repuation.card";
import styled from "@emotion/styled";
import CopyText from "@/src/components/copy-text";
import { useDispatch } from "react-redux";
import { getHamsterPublicProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { useRouter } from "next/router";

/** @dev Define styled component. */
export const StyledUserInfoCard = styled.div`
  box-shadow: 0px 6px 12px rgba(28, 39, 49, 0.05);
  border-radius: 32px;
  padding: 40px;
  width: 100%;
`;

export const UserInfoCard: FC<UserInfoCardProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<hProfileDto>();

  useEffect(() => {
    dispatch(
      getHamsterPublicProfile({ id: props.userId }, (_profile) =>
        setProfile(_profile)
      )
    );
  }, [props.userId]);

  return (
    <StyledUserInfoCard className="bg-tDark dark:bg-tLight">
      <div className="md:flex items-center ">
        <img
          src={profile?.avatar || "/assets/images/sample-avatar.png"}
          alt="User avatar"
          className="w-[120px] h-[120px] md:float-right mx-auto md:mx-initial"
        />
        <div className="md:float-left md:ml-[26px] flex justify-center items-center md:block mt-[20px] md:mt-0">
          <CopyText content={profile?.walletAddress}>
            <p
              className="text-[24px] text-[#735CF7] cursor-pointer"
              onClick={() => router.push(`/u/${profile.id}/profile`)}
            >
              {utilsProvider.makeShort(profile?.walletAddress, 4)}
            </p>
          </CopyText>
          <div className="mt-[8px] ml-[8px] md:ml-0">
            <ReputationCard />
          </div>
        </div>
        <div className="md:ml-[20px]">
          <div className="md:flex items-center justify-center">
            <div className="md:float-left px-[70px] border-r-solid md:border-r-[1px] border-r-dark30 mt-[12px] md:mt-0">
              <p className="text-[24px] semi-bold text-center text-tLight dark:text-tDark">
                {profile?.ordersStat.orders || 0}
              </p>
              <p className="text-[16px] regular-text text-center text-tLight dark:text-tDark">
                Orders
              </p>
            </div>
            <div className="md:float-left px-[70px] border-r-solid md:border-r-[1px] border-r-dark30 mt-[12px] md:mt-0">
              <p className="text-[24px] semi-bold text-center text-tLight dark:text-tDark">
                {completedOrderPercent(
                  profile?.ordersStat.completedOrders,
                  profile?.ordersStat.orders
                )}
                %
              </p>
              <p className="text-[16px] regular-text text-center text-tLight dark:text-tDark">
                Completion
              </p>
            </div>
            <div className="md:float-left px-[70px] mt-[12px] md:mt-0">
              <p className="text-[24px] semi-bold text-center text-tLight dark:text-tDark">
                Contact
              </p>
              <div className="flex justify-around min-w-[197px]">
                {profile?.twitter && (
                  <a href={profile?.twitter} target="_blank">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.7716 8.08888C19.7784 8.26376 19.7807 8.43858 19.7807 8.61346C19.7807 13.9157 16.0508 20.0367 9.23024 20.0367C7.13507 20.0367 5.18687 19.369 3.54541 18.2322C3.83557 18.264 4.13025 18.2879 4.42945 18.2879C6.16663 18.2879 7.76664 17.6439 9.0358 16.5628C7.41318 16.5389 6.04304 15.3704 5.57049 13.7805C5.79734 13.8282 6.03096 13.8521 6.26987 13.8521C6.60675 13.8521 6.93384 13.8045 7.24736 13.7091C5.54937 13.3434 4.27043 11.7218 4.27043 9.77423C4.27043 9.75038 4.27043 9.74238 4.27043 9.72648C4.77086 10.0206 5.34363 10.2034 5.95183 10.2272C4.9555 9.50381 4.30056 8.2717 4.30056 6.88056C4.30056 6.14922 4.48295 5.4576 4.804 4.8614C6.63237 7.2939 9.3659 8.89174 12.4476 9.05867C12.3843 8.76455 12.3519 8.4546 12.3519 8.14458C12.3519 5.92671 14.0122 4.13013 16.0606 4.13013C17.127 4.13013 18.0902 4.61511 18.7662 5.39414C19.6126 5.21925 20.4054 4.88541 21.1229 4.42435C20.8448 5.36237 20.2577 6.14919 19.4905 6.64204C20.2411 6.54665 20.9571 6.33218 21.6211 6.01421C21.1229 6.81709 20.4959 7.52447 19.7716 8.08888Z"
                        fill="#1EA1F2"
                      />
                    </svg>
                  </a>
                )}
                {profile?.telegram && (
                  <a href={profile?.telegram} target="_blank">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.23723 11.4221C9.06997 9.31707 12.2918 7.92914 13.9027 7.25862C18.5076 5.34391 19.4632 5.01136 20.0874 5.0001C20.2247 4.9979 20.5303 5.03182 20.7297 5.19305C20.8954 5.32901 20.9421 5.5129 20.9654 5.642C20.9861 5.77098 21.0146 6.06493 20.9913 6.2944C20.7426 8.91538 19.6627 15.2756 19.1136 18.2113C18.8831 19.4534 18.4247 19.8699 17.9818 19.9105C17.0184 19.9991 16.288 19.2744 15.3557 18.6635C13.8975 17.707 13.074 17.1119 11.6573 16.1787C10.0205 15.1003 11.0823 14.5075 12.0147 13.5389C12.2581 13.2853 16.5004 9.42766 16.5807 9.07776C16.591 9.03399 16.6014 8.87083 16.503 8.78484C16.4072 8.6986 16.2647 8.72813 16.1611 8.75144C16.0135 8.78459 13.6852 10.3251 9.16839 13.3726C8.50797 13.8269 7.9097 14.0483 7.371 14.0366C6.78051 14.0239 5.64095 13.702 4.79405 13.427C3.7581 13.0895 2.93192 12.9111 3.00443 12.3379C3.04069 12.0396 3.45249 11.7342 4.23723 11.4221V11.4221Z"
                        fill="url(#paint0_linear_0_654)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_0_654"
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19.9179"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#2AABEE" />
                          <stop offset="1" stopColor="#229ED9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </a>
                )}
                <span className="text-[16px] regular-text text-purple">
                  Send Message
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledUserInfoCard>
  );
};
