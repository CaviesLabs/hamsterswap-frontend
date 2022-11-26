type GameProps = {
  image: string;
  name: string;
  publisher: string;
};

export type SelectProps = {
  options: GameProps[];
  className?: string;
  placeholder?: string;
};
