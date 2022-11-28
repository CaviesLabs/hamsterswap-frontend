import { IsString } from "class-validator";

/** @dev Expose dto for create-chat-room function. */
export class CreateChatRoomDto {
  @IsString()
  senderId: string;

  @IsString()
  reciverId: string;
}

/** @dev Expose dto for create-user-chat function. */
export class CreateUserChatDto {
  @IsString()
  userId: string;

  @IsString()
  displayName: string;

  @IsString()
  photoURL: string;

  @IsString()
  chatRoomId: string;
}
