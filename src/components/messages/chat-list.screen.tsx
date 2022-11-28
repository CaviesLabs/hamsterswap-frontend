import { FC } from "react";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { utilsProvider } from "@/src/utils/utils.provider";

const mockData: UserChatEntity[] = [
  {
    chatRoomId: "",
    userId: "WSf0DnjdpCP3duMc03y5tfZXqT22",
    reciverId: "hMyHzFHfFgPbpjfjzj7F9N6qDVA2",
    displayName: "hMyHzFHfFgPbpjfjzj7F9N6qDVA2",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
    date: "",
    lastMessage: {
      senderId: "hMyHzFHfFgPbpjfjzj7F9N6qDVA2",
      message: "Hey, are you there?",
      seen: false,
    },
  },
];

export const ChatListScreen: FC = () => {
  return (
    <div className="overflow-y-scroll bg-white h-full">
      {mockData.map((item, index) => (
        <div
          className="flex items-center p-[24px] bg-white hover:bg-dark30 cursor-pointer"
          key={`chat-room-list-item-${index}`}
        >
          <img
            src={item.photoURL}
            alt="avatar"
            className="w-[56px] h-[56px] float-left rounded-[50%]"
          />
          <div className="float-left ml-[16px] border-b-solid border-b-[1px] border-b-dark30 w-[90%] pb-[10px]">
            <div className="flow-root">
              <p className="text-[18px] semi-bold float-left chatusername">
                {utilsProvider.makeShort(item.reciverId, 4)}
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
