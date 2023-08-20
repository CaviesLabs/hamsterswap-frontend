import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { NftEntity } from "@/src/dto/nft.dto";
import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { PlatformConfigDto } from "@/src/entities/platform-config.entity";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { ProposalDto } from "@/src/dto/proposal.dto";
import { ChainId } from "@/src/entities/chain.entity";

/**
 * @dev Initialize app state.
 */
export default interface State {
  user: hProfileDto;
  userChats: UserChatEntity[];
  nft: NftEntity[];
  proposal: ProposalDto;
  proposals: SwapProposalEntity[];
  hProfile: hProfileDto;
  hPublicProfile: hProfileDto;
  platformConfig: PlatformConfigDto;
  chainId: ChainId;
}
