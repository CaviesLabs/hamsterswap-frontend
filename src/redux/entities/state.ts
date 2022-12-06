import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { NftDto } from "@/src/dto/nft.dto";
import { ProposalDto } from "@/src/dto/proposal.dto";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { PlatformConfigDto } from "@/src/dto/platform-config";

export default interface State {
  user: User;
  userChats: UserChatEntity[];
  nft: NftDto;
  proposal: ProposalDto;
  hProfile: hProfileDto;
  hPublicProfile: hProfileDto;
  platformConfig: PlatformConfigDto;
}
