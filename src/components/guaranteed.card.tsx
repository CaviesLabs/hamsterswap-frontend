import { FC } from "react";
import styled from "@emotion/styled";

/** @dev Define styled component */
export const StyledGuaranteedCard = styled.div`
  height: 32px;
  padding: 0 16px;
  background: linear-gradient(90deg, #1eb130 0%, #1ea866 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  svg {
    height: 24px;
    width: 24px;
  }
  span {
    margin-left: 8px;
    font-family: semi-poppins-bold;
    font-size: 14px;
    line-height: 12px;
    color: #fff;
    text-transform: uppercase;
  }
`;

export const GuaranteedCard: FC<{ className: string }> = ({ className }) => {
  return (
    <StyledGuaranteedCard className={className}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[16px]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C11.8733 2 11.7494 2.03642 11.6439 2.10468C9.21698 3.69534 6.45056 4.73004 3.55286 5.13088C3.3995 5.15196 3.25912 5.22616 3.15754 5.33984C3.05597 5.45352 3.00002 5.59903 3 5.74961V11.3745C3 16.2369 5.96743 19.7869 11.7686 21.9581C11.9175 22.014 12.0825 22.014 12.2314 21.9581C18.0339 19.7869 21 16.2382 21 11.3745V5.74961C21 5.59922 20.9443 5.45386 20.8429 5.34021C20.7416 5.22655 20.6016 5.15223 20.4484 5.13088C17.5503 4.73022 14.7834 3.69552 12.3561 2.10468C12.2506 2.03642 12.1267 2 12 2ZM16.2692 10.7431C16.6796 10.3735 16.7127 9.7412 16.3431 9.33081C15.9735 8.92041 15.3412 8.88733 14.9308 9.25691L11.1469 12.6645L9.05641 10.8456C8.63976 10.4831 8.00812 10.5269 7.6456 10.9436C7.28307 11.3602 7.32694 11.9919 7.74359 12.3544L10.5019 14.7544C10.8831 15.0861 11.452 15.0813 11.8275 14.7431L16.2692 10.7431Z"
          fill="white"
        />
      </svg>
      <span>WARRANTY</span>
    </StyledGuaranteedCard>
  );
};
