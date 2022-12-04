import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { NftDto } from "@/src/dto/nft.dto";
import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { ProposalItem } from "@/src/components/user/types";

/**
 * @dev Initialize app state.
 */
export default interface State {
  user: User;
  nft: NftDto;
  userChats: UserChatEntity[];
  proposals: SwapProposalEntity[];
  proposal: ProposalItem;
}
