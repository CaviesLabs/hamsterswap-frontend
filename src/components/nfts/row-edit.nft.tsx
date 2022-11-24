import { FC, useState } from "react";
import { RowNftEditItemProps } from "./types";

export const RowEditNftItem: FC<RowNftEditItemProps> = (props) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="md:left w-full mb-[20px]">
      <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 flex rounded-[16px] p-[16px]">
        <div className="left pl-[2px]">
          <img
            src={props.image}
            alt="NFT image"
            className="!h-full !w-[72px] !object-cover !rounded-[8px]"
          ></img>
        </div>
        <div className="px-4 w-72 left">
          {/* <span className="text-gray-400 mr-3 uppercase text-xs">Nft Name</span> */}
          <p className="text-lg semi-bold text-black truncate block capitalize">
            {props.name}
          </p>
          <div className="flex items-center">
            <p className="text-[14px] regular-text text-purple cursor-auto mb-3">
              {props.collection}
            </p>
          </div>
        </div>
        <div className="ml-auto left mr-[20px] relative">
          <button
            className="relative right-[-20px]"
            onClick={() => setCollapse(!collapse)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.5 13.5C6.5 12.6716 7.17157 12 8 12C8.82843 12 9.5 12.6716 9.5 13.5C9.5 14.3284 8.82843 15 8 15C7.17157 15 6.5 14.3284 6.5 13.5ZM6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8ZM8 1C7.17157 1 6.5 1.67157 6.5 2.5C6.5 3.32843 7.17157 4 8 4C8.82843 4 9.5 3.32843 9.5 2.5C9.5 1.67157 8.82843 1 8 1Z"
                fill="#7886A0"
              />
            </svg>
          </button>
          {collapse && (
            <div
              className="absolute right-[-20px] z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <li
                  className="regular-text group text-red300 hover:text-red-400 block px-4 py-2 text-sm flex items-center cursor-pointer"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={props.onDelete}
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-[12px] fill-red300 group-hover:fill-red-400"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5247 2.49547C11.7841 2.49547 12 2.71081 12 2.9848V3.23813C12 3.50546 11.7841 3.72746 11.5247 3.72746H0.475902C0.215907 3.72746 0 3.50546 0 3.23813V2.9848C0 2.71081 0.215907 2.49547 0.475902 2.49547H2.41971C2.81457 2.49547 3.1582 2.21481 3.24703 1.81881L3.34882 1.36415C3.50702 0.744825 4.02766 0.333496 4.62351 0.333496H7.37649C7.96585 0.333496 8.49233 0.744825 8.64469 1.33149L8.75362 1.81815C8.8418 2.21481 9.18543 2.49547 9.58094 2.49547H11.5247ZM10.5372 11.7562C10.7402 9.86487 11.0955 5.37158 11.0955 5.32625C11.1084 5.18891 11.0637 5.05892 10.9749 4.95425C10.8796 4.85625 10.759 4.79825 10.626 4.79825H1.37901C1.24545 4.79825 1.11837 4.85625 1.03019 4.95425C0.940717 5.05892 0.896628 5.18891 0.903112 5.32625C0.904303 5.33458 0.917053 5.49285 0.938368 5.75747C1.03306 6.93297 1.29678 10.2069 1.46719 11.7562C1.58779 12.8975 2.33665 13.6148 3.42137 13.6408C4.25842 13.6602 5.12075 13.6668 6.00253 13.6668C6.83309 13.6668 7.67662 13.6602 8.53959 13.6408C9.66192 13.6215 10.4101 12.9168 10.5372 11.7562Z"
                    />
                  </svg>
                  Delete this item
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
