import { FC } from "react";
import { IconProps } from "./types";
import classnames from "classnames";

/** @dev Expore Plus Icon Component */
export const PlustIcon: FC<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 1.75C8.75 1.33579 8.41421 1 8 1C7.58579 1 7.25 1.33579 7.25 1.75V7.25H1.75C1.33579 7.25 1 7.58579 1 8C1 8.41421 1.33579 8.75 1.75 8.75H7.25V14.25C7.25 14.6642 7.58579 15 8 15C8.41421 15 8.75 14.6642 8.75 14.25V8.75H14.25C14.6642 8.75 15 8.41421 15 8C15 7.58579 14.6642 7.25 14.25 7.25H8.75V1.75Z"
        fill="white"
      />
    </svg>
  );
};

/** @dev Search Icon Component */
export const SearchIcon: FC<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5748 16.2984C14.3479 17.3587 12.7488 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.8483 17.2837 14.5293 16.1135 15.7804C15.9917 15.8294 15.8777 15.9033 15.7792 16.0021C15.6911 16.0904 15.623 16.191 15.5748 16.2984ZM16.495 18.1284C14.9748 19.3019 13.0689 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.181 19.2242 15.1808 17.9336 16.7385L21.7469 20.5419C22.1379 20.9319 22.1387 21.5651 21.7487 21.9561C21.3587 22.3471 20.7255 22.3479 20.3345 21.9579L16.495 18.1284Z"
        fill="#353C4B"
      />
    </svg>
  );
};

export const DollarIcon: FC<IconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.7656 5.33333C11.3773 5.33333 11.0625 5.64813 11.0625 6.03646V7.27555C9.42579 7.53771 8.32212 8.54759 8.32212 9.96679C8.32212 11.3177 9.2465 12.1849 11.1346 12.543L12.1377 12.7315C13.3243 12.964 13.7701 13.3033 13.7701 13.9003C13.7701 14.5663 13.049 15.0564 11.9869 15.0564C11.0822 15.0564 10.3413 14.7423 10.0332 14.0511C9.7972 13.6489 9.52841 13.4981 9.12194 13.4981C8.61058 13.4981 8.25 13.8312 8.25 14.3338C8.25 14.5035 8.28934 14.6794 8.3549 14.8428C8.67465 15.6776 9.61097 16.3392 11.0625 16.5286V17.7552C11.0625 18.1435 11.3773 18.4583 11.7656 18.4583C12.1539 18.4583 12.4688 18.1435 12.4688 17.7552V16.5637C14.5153 16.4076 15.75 15.3287 15.75 13.6929C15.75 12.3168 14.8846 11.544 12.8785 11.1607L11.882 10.9659C10.7609 10.7522 10.3086 10.4066 10.3086 9.84741C10.3086 9.18136 10.9576 8.74151 11.9344 8.74151C12.7474 8.74151 13.3571 9.02427 13.6718 9.70917C13.8947 10.0987 14.17 10.2684 14.6158 10.2684C15.1206 10.2684 15.4615 9.96051 15.4615 9.5081C15.4615 9.34473 15.4353 9.21277 15.3894 9.0871C15.0142 8.03074 13.9313 7.36128 12.4688 7.23149V6.03646C12.4688 5.64813 12.1539 5.33333 11.7656 5.33333Z"
        fill="url(#paint0_linear_283_7337)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_283_7337"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0977DD" />
          <stop offset="1" stopColor="#00519B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SolanaIcon: FC<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_98_4327)">
        <path
          d="M5.24872 15.9638C5.36941 15.8431 5.53537 15.7727 5.71138 15.7727H21.6732C21.9648 15.7727 22.1107 16.1247 21.9045 16.3309L18.7514 19.484C18.6307 19.6047 18.4647 19.6751 18.2887 19.6751H2.32692C2.03524 19.6751 1.8894 19.3231 2.09559 19.1169L5.24872 15.9638Z"
          fill="url(#paint0_linear_98_4327)"
        />
        <path
          d="M5.24872 4.1911C5.37444 4.0704 5.54039 4 5.71138 4H21.6732C21.9648 4 22.1107 4.35202 21.9045 4.55821L18.7514 7.71134C18.6307 7.83203 18.4647 7.90244 18.2887 7.90244H2.32692C2.03524 7.90244 1.8894 7.55042 2.09559 7.34423L5.24872 4.1911Z"
          fill="url(#paint1_linear_98_4327)"
        />
        <path
          d="M18.7514 10.0397C18.6307 9.91904 18.4647 9.84863 18.2887 9.84863H2.32692C2.03524 9.84863 1.8894 10.2007 2.09559 10.4068L5.24872 13.56C5.36941 13.6807 5.53537 13.7511 5.71138 13.7511H21.6732C21.9648 13.7511 22.1107 13.399 21.9045 13.1929L18.7514 10.0397Z"
          fill="url(#paint2_linear_98_4327)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_98_4327"
          x1="20.1483"
          y1="2.11641"
          x2="9.10152"
          y2="23.2755"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_98_4327"
          x1="15.3181"
          y1="-0.405401"
          x2="4.27125"
          y2="20.7537"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_98_4327"
          x1="17.7178"
          y1="0.847478"
          x2="6.67101"
          y2="22.0066"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <clipPath id="clip0_98_4327">
          <rect
            width="20"
            height="15.6751"
            fill="white"
            transform="translate(2 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckIcon: FC<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.14286L7.54545 13L19 1"
        stroke="#735CF7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LoadingIcon: FC<IconProps> = (props) => {
  return (
    <svg
      className={classnames("animate-spin -ml-1 mr-3 h-5 w-5", props.className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const ChevronDownIcon: FC<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
};
