/** @dev Export chat room entity. */
export class ChatRoomEntity {
  messages: string[];
}

/** @dev Export user chat entity. */
export class UserChatEntity {
  userId: string;
  displayName: string;
  photoURL: string;
  chatRoomId: string;
  date: string;
}
