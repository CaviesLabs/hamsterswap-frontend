import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
export default interface State {
  user: User;
  userChats: UserChatEntity[];
}
