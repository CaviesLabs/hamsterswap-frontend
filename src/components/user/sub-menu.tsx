import { FC } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import { SubMenuProps } from "@/src/components/user/types";

const SubMenu: FC<SubMenuProps> = (props) => {
  const router = useRouter();
  const { id: userId } = router.query;
  const { curTab } = props;
  /**
   * TODO filter sub-menu items for public and personal view
   * only show Proposal and History for public sight
   */
  return (
    <div className="py-[40px]">
      <div className="flex justify-center items-center">
        {[
          ["Proposal", "profile"],
          ["History", "history"],
          ["Game ID", "#"],
          ["Payment", "payment"],
          ["Contacts", "contacts"],
        ].map((item, index) => (
          <div
            onClick={() => router.push(`/u/${userId}/${item[1]}`)}
            key={`tabt-title-${index}`}
            className="px-[40px] h-[30px] cursor-pointer"
          >
            <p
              className={classnames("px-[10px] cursor-pointer text-dark60", {
                "!text-purple": index === curTab,
              })}
            >
              {item[0]}
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
