import { Input } from "antd";
import { SearchIcon } from "@/src/components/icons";
import { SearchInputProps } from "@/src/components/search/types";

export default function (props: SearchInputProps) {
  return (
    <Input
      size="large"
      className={props.className}
      placeholder={props.placeholder}
      prefix={<SearchIcon />}
    />
  );
}
