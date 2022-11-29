/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { Input } from "antd";
import { Button } from "@hamsterbox/ui-kit";
import { useMain } from "@/src/hooks/pages/main";
import { getChatService } from "@/src/actions/firebase.action";
import { MessageEntity } from "@/src/entities/chatroom.entity";
import { ConversationScreenProps } from "./types";
import classnames from "classnames";

export const ConversationScreen: FC<ConversationScreenProps> = (props) => {
  /** @dev Get recieverId from props. */
  const { recieverId } = props;

  /** @dev Get user state. */
  const { user } = useMain();

  /** @dev Initlize local state. */
  const [curMessage, setCurMessage] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  /** @dev Get services */
  const chatService = getChatService();

  /** @dev Then function to handle sending message to server. */
  const handleSendMessage = async () => {
    chatService.sendMessage({
      chatRoomId,
      recieverId,
      userId: user.uid,
      message: curMessage,
    });
  };

  /** @dev Process to generate chatroom id from @var {userId} and @var {recieverId} */
  useEffect(() => {
    /** @dev Use default @var {chatRoomId} if exist. */
    if (props.chatRoomId) {
      setChatRoomId(props.chatRoomId);
      return;
    }

    /**
     * @dev Generate new chatroom ID.
     * by combination between @var {userId} and @var {recieverId}
     * */
    if (!recieverId) return;
    const chatRoomId =
      user.uid.length > recieverId.length
        ? user.uid + recieverId
        : recieverId + user.uid;
    setChatRoomId(chatRoomId);
  }, [recieverId, user, props.chatRoomId]);

  /** @dev Listen realtime messages from server. */
  useEffect(() => {
    console.log("chatRoomId", { u: user.uid, recieverId, chatRoomId });
    if (chatRoomId) {
      chatService.onMessage(chatRoomId, (chatData) => {
        setMessages(chatData?.messages);
      });
    }
  }, [chatRoomId]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <div className="conversation">
        <div className="timing">22 Nov 2022, 17:47</div>
        <div className="message-row">
          {messages.map((item, index) => (
            <div
              key={`message-row-${index}`}
              className={classnames("message-wrap", {
                "message--right": item.senderId === user.uid,
                "message--left": item.senderId !== user.uid,
              })}
            >
              <div className="message">{item.message}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between w-full bg-white py-4 px-2">
        <Input
          bordered={false}
          placeholder="Type something"
          onClick={() => {}}
          value={curMessage}
          onChange={(e) => setCurMessage(e.target.value)}
        />
        <Button
          shape="round"
          className="bg-purple"
          onClick={handleSendMessage}
          text="Send"
        />
      </div>
    </div>
  );
};
