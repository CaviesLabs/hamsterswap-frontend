import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { NftDto } from "@/src/dto/nft.dto";
import { hProfileDto } from "@/src/dto/hProfile.dto";

export default interface State {
  user: User;
  userChats: UserChatEntity[];
  nft: NftDto;
  hProfile: hProfileDto;
}
