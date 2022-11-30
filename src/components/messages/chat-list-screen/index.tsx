import { FC } from "react";
import { utilsProvider } from "@/src/utils/utils.provider";
import { useMain } from "@/src/hooks/pages/main";
import { Props, MOCK_DATA } from "./types";

export const ChatListScreen: FC<Props> = (props) => {
  /** @dev Get user chats data from state. */
  const { userChats } = useMain();

  return (
    <div className="overflow-y-scroll bg-white h-full">
      {MOCK_DATA.concat(userChats).map((item, index) => (
        <div
          key={`chat-room-list-item-${index}`}
          className="flex items-center p-[24px] bg-white hover:bg-dark30 cursor-pointer"
          onClick={() => props.onClickItem(item?.recieverId, item?.chatRoomId)}
        >
          <img
            src={item.photoURL}
            alt="avatar"
            className="w-[56px] h-[56px] float-left rounded-[50%]"
          />
          <div className="float-left ml-[16px] border-b-solid border-b-[1px] border-b-dark30 w-[90%] pb-[10px]">
            <div className="flow-root">
              <p className="text-[18px] semi-bold float-left chatusername">
                {utilsProvider.makeShort(item?.recieverId, 4)}
              </p>
              <p className="float-right text-[14px] regular-text relative top-[5px]">
                23:20
              </p>
            </div>
            <div className="flow-root pt-[10px]">
              <p className="text-[16px] regular-text float-left">
                {item?.lastMessage?.message}
              </p>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="float-right"
              >
                <rect width="12" height="12" rx="6" fill="#DE2C47" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
