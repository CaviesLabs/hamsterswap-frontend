/** @dev Expose last message entity. */
export class LastMessageEntity {
  senderId: string;
  message: string;
  seen: boolean;
}

/** @dev Export message item entity. */
export class MessageEntity {
  senderId: string;
  date: string;
  message: string;
  attached?: {
    url: string;
  };
}

/** @dev Export chat room entity. */
export class ChatRoomEntity {
  messages: MessageEntity[];
}

/** @dev Export user chat entity. */
export class UserChatEntity {
  chatRoomId: string;
  userId: string;
  recieverId: string;
  displayName: string;
  photoURL: string;
  date: string;
  lastMessage: LastMessageEntity;
}
