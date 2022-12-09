import { useEffect, useState } from "react";
import { DatePicker, Dropdown, Input } from "antd";
import { ChevronDownIcon } from "@/src/components/icons";
import { TIME_ARRAYS } from "@/src/utils";
import { DatetimePickerProps } from "@/src/components/create-proposal/step3/types";
import dayjs, { Dayjs } from "dayjs";

/**
 * @description
 * This component will be wrapped by From.Item,
 * so, it must have value & onChange attribute.
 * the `value` will store the full datetime value
 * the `onChange` will be triggered when value of each component changed
 */
export default function DatetimePicker(props: DatetimePickerProps) {
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs("2022-08-08"));
  const value = props.value;

  /**
   * @dev
   * Modify time
   * Split value to get hour & minute for modifying
   * @param {string} timeSelected
   */
  const handleSelectTime = (timeSelected: string) => {
    const [hour, minute] = timeSelected.split(":");
    const newValue = dateTime
      ?.set("hour", parseInt(hour) | 0)
      ?.set("minute", parseInt(minute) | 0);

    setDateTime(newValue);
  };

  /**
   * @dev Modify date value in datetime.
   * @param _date
   */
  const handleSelectDate = (_date: any) => {
    const date = new Date(_date);
    const newValue = dateTime
      ?.set("date", date.getDate())
      ?.set("year", date.getUTCFullYear())
      ?.set("month", date.getMonth());
    setDateTime(newValue);
  };

  useEffect(() => {
    setDateTime(dayjs(Date.now()));
  }, []);

  useEffect(() => {
    props.onChange(dateTime.toDate());
  }, [dateTime]);

  return (
    <div className="flex">
      <DatePicker
        format="DD/MM/YYYY"
        size="large"
        className="rounded-[16px] px-[50px]"
        placeholder="dd/mm/yyyy"
        // defaultValue={new Date(dateTime.date())}
        onChange={(v) => handleSelectDate(v)}
      />
      <div className="ml-[20px] relative">
        <Dropdown
          menu={{
            items: TIME_ARRAYS.map((_) => ({
              key: _,
              label: (
                <div
                  className="w-full px-4 py-2 text-sm text-gray-700 text-center relative left-[-10px] regular-text"
                  onClick={() => handleSelectTime(_)}
                >
                  {_}
                </div>
              ),
            })),
          }}
          trigger={["click"]}
          placement="bottom"
          dropdownRender={(menu) => (
            <div className="h-52 overflow-scroll">{menu}</div>
          )}
        >
          <div className="flex items-center w-40 border border-gray-300 rounded-[16px]">
            <Input
              disabled={!value}
              bordered={false}
              className="text-center text-gray-500 focus:ring-0 text-center regular-text rounded-[16px]"
              value={
                dateTime
                  ? `${dateTime.format("HH")}:${dateTime.format("mm")}`
                  : "00:00"
              }
              onChange={(e) => handleSelectTime(e.target.value)}
            />
            <ChevronDownIcon className="w-5 text-gray-500 mr-3" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
