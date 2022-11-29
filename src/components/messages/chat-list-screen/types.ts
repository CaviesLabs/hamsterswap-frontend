import { UserChatEntity } from "@/src/entities/chatroom.entity";

export const MOCK_DATA: UserChatEntity[] = [
  {
    chatRoomId: "",
    userId: "WSf0DnjdpCP3duMc03y5tfZXqT22",
    recieverId: "GfAc2hATI8ZvvK8lbOhMKXm0dVV2",
    displayName: "GfAc2hATI8ZvvK8lbOhMKXm0dVV2",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
    date: "",
    lastMessage: {
      senderId: "GfAc2hATI8ZvvK8lbOhMKXm0dVV2",
      message: "Hey, are you there?",
      seen: true,
    },
  },
];

export type Props = {
  onClickItem(reciverId: string, chatRoomId: string): void;
};
