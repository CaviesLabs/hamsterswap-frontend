import { DatePicker, Dropdown, Input } from "antd";
import { ChevronDownIcon } from "@/src/components/icons";
import { TIME_ARRAYS } from "@/src/utils";
import { DatetimePickerProps } from "@/src/components/create-proposal/step3/types";

/**
 * @description
 * This component will be wrapped by From.Item,
 * so, it must have value & onChange attribute.
 * the `value` will store the full datetime value
 * the `onChange` will be triggered when value of each component changed
 */
export default function DatetimePicker(props: DatetimePickerProps) {
  const value = props.value;

  const handleSelectTime = (timeSelected: string) => {
    const [hour, minute] = timeSelected.split(":");
    const newValue = value
      ?.set("hour", parseInt(hour) | 0)
      .set("minute", parseInt(minute) | 0);
    props.onChange(newValue);
  };

  return (
    <div className="flex">
      <DatePicker
        format="DD/MM/YYYY"
        size="large"
        className="rounded-[16px] px-[50px]"
        placeholder="dd/mm/yyyy"
        value={props.value}
        onChange={(v) => props.onChange(v)}
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
                props.value
                  ? `${props.value?.format("HH")}:${props.value?.format("mm")}`
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
