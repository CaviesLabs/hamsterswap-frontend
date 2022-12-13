import { FC } from "react";
import { IconProps } from "@/src/components/icons/types";

export const StripeIcon: FC<IconProps> = (props) => (
  <svg
    className={props.className}
    width="28"
    height="40"
    viewBox="0 0 28 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1209 11.9121C11.1209 10.1978 12.5275 9.53846 14.8571 9.53846C18.1978 9.53846 22.4176 10.5494 25.7582 12.3516V2.02198C22.1099 0.571428 18.5055 0 14.8571 0C5.93407 0 0 4.65934 0 12.4396C0 24.5714 16.7033 22.6374 16.7033 27.8681C16.7033 29.8901 14.9451 30.5495 12.4835 30.5495C8.83516 30.5495 4.17582 29.0549 0.483516 27.033V37.4945C4.57143 39.2527 8.7033 40 12.4835 40C21.6264 40 27.9121 35.4725 27.9121 27.6044C27.8681 14.5055 11.1209 16.8352 11.1209 11.9121Z"
      fill="#635BFF"
    />
  </svg>
);
