import { SelectProps, OptionProps } from "@/src/components/select/types";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon } from "@/src/components/icons";
import SearchInput from "@/src/components/search";
import { useRef, useState } from "react";
import useOnClickOutside from "@/src/hooks/useOnClickOutside";

function Select(props: SelectProps) {
  /**
   * @dev reference to the button
   * close the dropdown when user click outside
   */
  const ref = useRef(null);

  const { showSearch, values, onChange } = props;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const renderItemInfo = (option: OptionProps, inList?: boolean) => {
    if (!option) return;
    return (
      <>
        <div
          className={classnames(
            "w-1/6",
            inList ? "max-w-[36px]" : "max-w-[48px]"
          )}
        >
          <img className="rounded-[50%] aspect-square" src={option.image} />
        </div>
        <div className="pl-3 w-5/6 h-18 flex flex-col justify-between">
          <p className="text-[16px] regular-text">
            {option.label || option.value}
          </p>
          <p className="text-[16px] text-gray-400">{option.description}</p>
        </div>
      </>
    );
  };

  useOnClickOutside(ref, () => {
    setIsOpenDropdown(false);
  });

  return (
    <div className="relative">
      <div
        className={classnames(
          props.className,
          "py-3 px-4 text-lg font-regular border rounded-2xl cursor-pointer flex justify-between items-center"
        )}
        style={{ backgroundColor: "white", color: "#20242D" }}
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
      >
        {props.mode === "multiple" || !values || !values[0]
          ? props.placeholder
          : renderItemInfo(
              props.options.find((_) => _.value === values[0]),
              true
            )}
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {isOpenDropdown && (
        <div
          ref={ref}
          className="bg-white rounded-2xl mt-2 border absolute w-full z-10"
          style={{
            boxShadow: "0px 25px 40px -10px rgba(28, 39, 49, 0.08)",
          }}
        >
          {showSearch && (
            <div className="p-4">
              <SearchInput
                className="rounded-3xl p-3"
                placeholder={props.searchPlaceholder}
              />
            </div>
          )}

          <div className="overflow-y-scroll max-h-64">
            {props.options.map((option, i) => (
              <div
                className="cursor-pointer hover:bg-dark30 px-6"
                key={`${option.value}${i}`}
                onClick={() => {
                  onChange && onChange(option.value);
                  setIsOpenDropdown(false);
                }}
              >
                <div className="flex items-center border-b py-4">
                  {renderItemInfo(option)}
                  <div className="mr-2">
                    {values?.indexOf(option.value) > -1 && <CheckIcon />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
