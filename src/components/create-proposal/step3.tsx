import { FC, useState } from "react";
import { DatePicker, Input, Dropdown } from "antd";
import { TIME_ARRAYS } from "@/src/utils";
import { ChevronDownIcon } from "@/src/components/icons";

export const Step3: FC = () => {
  /** @dev select time and set to input. */
  const [timeSelected, selectTime] = useState("00:00");

  const items = TIME_ARRAYS.map((_) => ({
    key: _,
    label: (
      <li
        className="w-full px-4 py-2 text-sm text-gray-700 text-center relative left-[-10px] regular-text"
        onClick={() => selectTime(_)}
      >
        {_}
      </li>
    ),
  }));

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
            <DatePicker
              format="DD/MM/YYYY"
              size="large"
              className="rounded-[16px] px-[50px]"
              placeholder="dd/mm/yyyy"
            />
            <div className="ml-[20px] relative">
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottom"
                dropdownRender={(menu) => (
                  <div className="h-52 overflow-scroll">{menu}</div>
                )}
              >
                <div className="flex items-center w-40 border border-gray-300 rounded-[16px]">
                  <Input
                    bordered={false}
                    className="text-center text-gray-500 focus:ring-0 text-center regular-text rounded-[16px]"
                    value={timeSelected}
                    onChange={(e) => selectTime(e.target.value)}
                  />
                  <ChevronDownIcon className="w-5 text-gray-500 mr-3" />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
