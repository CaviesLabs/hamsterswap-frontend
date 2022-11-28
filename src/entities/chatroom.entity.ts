/** @dev Export chat room entity. */
export class ChatRoomEntity {
  messages: string[];
}

/** @dev Export user chat entity. */
export class UserChatEntity {
  chatRoomId: string;
  userId: string;
  reciverId: string;
  displayName: string;
  photoURL: string;
  date: string;
  lastMessage: {
    senderId: string;
    message: string;
    seen: boolean;
  };
}
