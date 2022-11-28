import { ReactNode } from "react";

type OptionProps = {
  value: string;
  image?: string;
  description?: string;
};

export type SelectProps = {
  options: OptionProps[];
  className?: string;
  placeholder?: ReactNode;
  searchPlaceholder?: string;
  showSearch?: boolean;
  mode?: "multiple";
  values?: string[];
};
