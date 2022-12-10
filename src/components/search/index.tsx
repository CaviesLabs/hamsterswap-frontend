import { Input } from "antd";
import { SearchIcon } from "@/src/components/icons";
import { SearchInputProps } from "@/src/components/search/types";
import styled from "@emotion/styled";

function Search(props: SearchInputProps) {
  return (
    <StyledInput>
      <Input
        size="large"
        className={props.className}
        placeholder={props.placeholder}
        prefix={<SearchIcon />}
        value={props.value}
        onChange={props.onChange}
      />
    </StyledInput>
  );
}

export default Search;

const StyledInput = styled.div`
  width: 100%;
  span {
    background-color: #f8f9fe;
    .ant-input {
      background-color: #f8f9fe;
    }
  }
`;
