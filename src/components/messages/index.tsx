/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import StyledMessages from "./messages.style";
import { utilsProvider } from "@/src/utils/utils.provider";
import { UserAvatarMessage } from "@/src/components/messages/avatar";
import { ConversationScreen } from "./conversation-screen";
import { ChatListScreen } from "./chat-list-screen";
import classnames from "classnames";

const Messages: FC = () => {
  const [closed, setClosed] = useState(false);
  const [opened, setOpened] = useState(true);
  const [recieverId, setRecieverId] = useState("");
  const [chatroomId, setChatRoomId] = useState("");
  const [curScreen, setCurScreen] = useState(0);

  /**
   * @dev Call function when click on each chat item.
   * @param {string} reciverId.
   */
  const onClickItem = (reciverId: string, chatRoomId: string) => {
    setRecieverId(reciverId);
    setChatRoomId(chatRoomId);
    setCurScreen(1);
  };

  /**
   * @dev Call function to back screen.
   */
  const onBack = () => {
    setRecieverId("");
    setChatRoomId("");
    setCurScreen(0);
  };

  if (closed) return null;
  return (
    <StyledMessages>
      <div className="container max-w-7xl mx-auto flex flex-row-reverse">
        <div className="bg-purple w-[460px] rounded-t-lg">
          <UserAvatarMessage
            curScreen={curScreen}
            opened={opened}
            onBack={onBack}
            setOpened={setOpened}
            setClosed={() => setClosed(true)}
            avatar="https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg"
            walletAddress={utilsProvider.makeShort(recieverId, 4)}
          />
          <div className={classnames("message-body", opened && "open")}>
            {curScreen === 0 ? (
              <ChatListScreen onClickItem={onClickItem} />
            ) : (
              <ConversationScreen
                recieverId={recieverId}
                chatRoomId={chatroomId}
              />
            )}
          </div>
        </div>
      </div>
    </StyledMessages>
  );
};

export default Messages;
