/**
 * @dev Define props interface for @var {UserAvatarCard} component.
 */
export type UserAvatarCardItemProps = {
  className?: string;
  walletAddress: string;
  orders: number;
  completion: number;
  avatar: string;
  reputation?: boolean | false;
};

/**
 * @dev Define props interface for @var {UserInfoCard} component.
 */
export type UserInfoCardProps = {
  userId: string;
};
