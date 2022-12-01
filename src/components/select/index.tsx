import { SelectProps, OptionProps } from "@/src/components/select/types";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon } from "@/src/components/icons";
import SearchInput from "@/src/components/search";
import { useState } from "react";

function Select(props: SelectProps) {
  const { showSearch, values, onChange } = props;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const renderItemInfo = (option: OptionProps) => {
    return (
      <>
        <div className="w-1/6 max-w-[60px]">
          <img className="rounded-[50%]" src={option.image} />
        </div>
        <div className="pl-6 w-5/6 h-18 flex flex-col justify-between">
          <p className="text-lg">{option.value}</p>
          <p className="text-lg text-gray-400">{option.description}</p>
        </div>
      </>
    );
  };

  return (
    <div className="relative">
      <div
        className={classnames(
          props.className,
          "p-3 text-lg font-regular border rounded-2xl cursor-pointer flex justify-between items-center"
        )}
        style={{ backgroundColor: "white", color: "#20242D" }}
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
      >
        {values?.filter((_) => _).length === 1
          ? renderItemInfo(props.options.find((_) => _.value === values[0]))
          : props.placeholder}
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {isOpenDropdown ? (
        <div className="bg-white rounded-2xl mt-2 border absolute w-full z-10">
          {showSearch && (
            <div className="p-4">
              <SearchInput
                className="rounded-3xl p-3"
                placeholder={props.searchPlaceholder}
              />
            </div>
          )}

          <div>
            {props.options.map((option, i) => (
              <div
                className="cursor-pointer hover:bg-dark30"
                key={`${option.value}${i}`}
                onClick={() => onChange && onChange(option.value)}
              >
                <div className="px-2 flex items-center border-b py-4">
                  {renderItemInfo(option)}
                  <div className="mr-2">
                    {values?.indexOf(option.value) > -1 && <CheckIcon />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Select;
