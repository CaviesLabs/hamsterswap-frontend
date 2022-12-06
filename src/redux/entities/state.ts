import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { NftDto } from "@/src/dto/nft.dto";
import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { PlatformConfigDto } from "@/src/dto/platform-config";
import { ProposalDto } from "@/src/dto/proposal.dto";

/**
 * @dev Initialize app state.
 */
export default interface State {
  user: User;
  userChats: UserChatEntity[];
  nft: NftDto;
  proposal: ProposalDto;
  proposals: SwapProposalEntity[];
  hProfile: hProfileDto;
  hPublicProfile: hProfileDto;
  platformConfig: PlatformConfigDto;
}
