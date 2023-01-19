import { FC, ReactNode } from "react";
import { ComponentProps } from "../types";
import styles from "@/styles/Home.module.css";
import classnames from "classnames";

export const LayoutSection: FC<ComponentProps & { children: ReactNode }> = (
  props
) => {
  return (
    <div
      className={classnames(
        styles.container,
        props.className,
        `mx-auto max-w-[86rem] px-4 sm:px-6 lg:px-8 pt-[20px] min-h-[60vh] pt-16`
      )}
    >
      {props.children}
    </div>
  );
};
