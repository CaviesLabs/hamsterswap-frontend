/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import StyledMessages from "./messages.style";
import { utilsProvider } from "@/src/utils/utils.provider";
import { UserAvatarMessage } from "@/src/components/messages/avatar";
import { ConversationScreen } from "./conversation.screen";
import { ChatListScreen } from "./chat-list.screen";
import classnames from "classnames";
// import { Button, Input } from "antd";

const Messages: FC = () => {
  const [closed, setClosed] = useState(false);
  const [opened, setOpened] = useState(true);

  if (closed) return null;
  return (
    <StyledMessages>
      <div className="container max-w-7xl mx-auto flex flex-row-reverse">
        <div className="bg-purple w-[460px] rounded-t-lg">
          <UserAvatarMessage
            opened={opened}
            setOpened={setOpened}
            setClosed={() => setClosed(true)}
            avatar="https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg"
            walletAddress={utilsProvider.makeShort(
              "F8qedeJsnrFnLfKpT4QN3GeAQqQMtq4izNLR1dKb5eRS",
              4
            )}
          />
          <div className={classnames("message-body", opened && "open")}>
            {/* <ConversationScreen /> */}
            <ChatListScreen />
          </div>
        </div>
      </div>
    </StyledMessages>
  );
};

export default Messages;
