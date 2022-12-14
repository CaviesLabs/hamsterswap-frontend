import { SelectProps, OptionProps } from "@/src/components/select/types";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon } from "@/src/components/icons";
import SearchInput from "@/src/components/search";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "@/src/hooks/useOnClickOutside";
import useDebounce from "@/src/hooks/useDebounce";

function Select(props: SelectProps) {
  /**
   * @dev reference to the button
   * close the dropdown when user click outside
   */
  const ref = useRef(null);

  const [search, setSearch] = useState<string>("");

  const { showSearch, values = [], onChange, onSearch, mode } = props;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const renderItemInfo = (option: OptionProps, inList?: boolean) => {
    if (!option) return;
    const { image } = option;
    return (
      <>
        <div
          className={classnames(
            image && "w-1/6 mr-3",
            inList ? "max-w-[36px]" : "max-w-[48px]"
          )}
        >
          <img className="rounded-[50%] aspect-square" src={option.image} />
        </div>
        <div className="w-full h-18 flex flex-col justify-between">
          <p className="text-[14px] regular-text">
            {option.label || option.value}
          </p>
          <p className="text-[12px] text-gray-400">{option.description}</p>
        </div>
      </>
    );
  };

  useOnClickOutside(ref, () => {
    setIsOpenDropdown(false);
  });

  const debouncedSearch: string = useDebounce<string>(search, 500);
  // Only call effect if debounced search term changes
  useEffect(() => {
    onSearch && onSearch(search);
  }, [debouncedSearch]);

  /**
   * @description
   * validate if dropdown closed, clear search text
   */
  useEffect(() => {
    if (!isOpenDropdown) setSearch("");
  }, [isOpenDropdown]);

  const handleSelect = (v: string) => {
    setIsOpenDropdown(false);

    if (!onChange) return;
    const newValues = [...values];
    if (mode === "multiple") {
      if (values.indexOf(v) > -1) {
        onChange(newValues.filter((_) => _ !== v));
      } else {
        newValues.push(v);
        onChange(newValues);
      }
    } else {
      onChange([v]);
    }
  };

  return (
    <div className="relative">
      <div
        className={classnames(
          props.className,
          "py-[10px] px-3 text-[14px] regular-text border rounded-3xl cursor-pointer flex justify-between items-center"
        )}
        style={{ backgroundColor: "white", color: "#20242D" }}
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
      >
        {mode === "multiple" || !values || !values[0]
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
          className="bg-white rounded-3xl mt-2 border absolute w-full z-10"
          style={{
            boxShadow: "0px 25px 40px -10px rgba(28, 39, 49, 0.08)",
          }}
        >
          {showSearch && (
            <div className="p-4">
              <SearchInput
                className="rounded-3xl p-3"
                placeholder={props.searchPlaceholder}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div className="overflow-y-scroll max-h-64">
            {props.options.map((option, i) => (
              <div
                className="cursor-pointer hover:bg-dark30 px-6"
                key={`${option.value}${i}`}
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center border-b py-4">
                  {renderItemInfo(option)}
                  {values?.indexOf(option.value) > -1 && <CheckIcon />}
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
