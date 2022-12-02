import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { NftDto } from "@/src/dto/nft.dto";

export default interface State {
  user: User;
  userChats: UserChatEntity[];
  nft: NftDto;
}
