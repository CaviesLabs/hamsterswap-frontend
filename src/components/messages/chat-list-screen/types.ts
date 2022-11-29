import { UserChatEntity } from "@/src/entities/chatroom.entity";

export const MOCK_DATA: UserChatEntity[] = [
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

export type Props = {
  onClickItem(reciverId: string): void;
};
