import { FC } from "react";
import { IconProps } from "./types";

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
        fill-rule="evenodd"
        clip-rule="evenodd"
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5748 16.2984C14.3479 17.3587 12.7488 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.8483 17.2837 14.5293 16.1135 15.7804C15.9917 15.8294 15.8777 15.9033 15.7792 16.0021C15.6911 16.0904 15.623 16.191 15.5748 16.2984ZM16.495 18.1284C14.9748 19.3019 13.0689 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.181 19.2242 15.1808 17.9336 16.7385L21.7469 20.5419C22.1379 20.9319 22.1387 21.5651 21.7487 21.9561C21.3587 22.3471 20.7255 22.3479 20.3345 21.9579L16.495 18.1284Z"
        fill="#353C4B"
      />
    </svg>
  );
};
