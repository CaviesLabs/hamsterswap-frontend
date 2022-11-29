import { useEffect } from "react";
import { utilsProvider } from "@/src/utils/utils.provider";

/** @dev Export UI hooks to prevent functions to handle UI jobs. */
export const useUI = (): void => {
  useEffect(() => {
    utilsProvider.withInterval(() => {
      const list = document.querySelectorAll(".slide");
      list.forEach((item) => {
        const _item: any = item;
        if (!item.classList.contains("selected")) {
          if (_item.style.height !== "0px") {
            _item.style.height = "0px";
          }
        } else {
          if (_item.style.height !== "auto") {
            _item.style.height = "auto";
          }
        }
      });
    }, 100);
  }, []);
};
