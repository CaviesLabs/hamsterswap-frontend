import { FC, useState } from "react";
import { DatePicker } from "antd";
import { TIME_ARRAYS } from "@/src/utils";

export const Step3: FC = () => {
  /** @dev Condition to show time select. */
  const [timeSelectDisplayed, setTimeSelectDisplayed] = useState(false);
  const [timeSelected, selectTime] = useState("00:00");

  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Additional Info
      </h3>
      <div className="block mt-[60px]">
        <div className="block mt-[60px]">
          <p className="text-[16px] regular-text">Proposal Note</p>
          <textarea
            className="bg-[#F8F9FE] w-full min-h-[212px] p-[24px] rounded-[16px] mt-[12px] outline-0 focus:outline-0 focus:ring-0 regular-text focus:border-0"
            placeholder="Additional Info"
          />
        </div>
        <div className="mt-[60px]">
          <p className="text-[16px] regular-text">
            Expired time
            <sup className="text-red300">*</sup>
          </p>
          <div className="mt-[12px] flex">
            <div className="float-left">
              <DatePicker size="large" className="rounded-[16px] px-[50px]" />
            </div>
            <div className="float-left ml-[20px]">
              <button
                id="states-button"
                data-dropdown-toggle="dropdown-states"
                className="z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 focus:ring-0 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-44 rounded-[16px] text-center flow-root regular-text"
                type="button"
                onClick={() => setTimeSelectDisplayed((prev) => !prev)}
              >
                {timeSelected}
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-1 float-right"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {timeSelectDisplayed && (
                <div className="relative">
                  <div className="z-4 bg-white divide-y divide-gray-100 rounded w-44 h-[255px] dark:bg-gray-700 top-[10px] relative">
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 h-[255px] overflow-y-scroll rounded-[16px] border-[1px] border-solid border-dark10"
                      aria-labelledby="states-button"
                    >
                      {TIME_ARRAYS.map((item, index) => (
                        <li key={`prp-${index}`}>
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              setTimeSelectDisplayed(false);
                              selectTime(item);
                            }}
                          >
                            <p className="text-center relative left-[-10px] regular-text">
                              {item}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
