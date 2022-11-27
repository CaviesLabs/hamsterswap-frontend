import { ReactNode } from "react";

type GameProps = {
  image: string;
  name: string;
  publisher: string;
};

export type SelectProps = {
  options: GameProps[];
  className?: string;
  placeholder?: ReactNode;
  searchPlaceholder?: string;
};
