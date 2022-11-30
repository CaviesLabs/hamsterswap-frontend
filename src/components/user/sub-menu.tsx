import { FC } from "react";
import classnames from "classnames";
import { SubMenuProps } from "@/src/components/user/types";

const SubMenu: FC<SubMenuProps> = (props) => {
  const { curTab } = props;
  /**
   * TODO filter sub-menu items for public and personal view
   * only show Proposal and History for public sight
   * TODO handle click on tab to navigate to site /u/<user_id>/<site_path>
   */
  return (
    <div className="py-[40px]">
      <div className="flex justify-center items-center">
        {[
          ["Proposal"],
          ["History"],
          ["Game ID"],
          ["Payment"],
          ["Contacts"],
        ].map((item, index) => (
          <div key={`tabt-title-${index}`} className="px-[40px] h-[30px]">
            <p
              className={classnames("px-[10px] cursor-pointer text-dark60", {
                "!text-purple": index === curTab,
              })}
            >
              {item}
            </p>
            {index === curTab && (
              <div className="w-full h-[4px] bg-purple rounded-[3px] mt-[10px]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
