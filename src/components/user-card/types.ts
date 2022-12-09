/**
 * @dev Define props interface for @var {UserAvatarCard} component.
 */
export type UserAvatarCardItemProps = {
  id?: string;
  className?: string;
  walletAddress: string;
  orders: number;
  completion: number | string;
  avatar: string;
  reputation?: boolean | false;
};

/**
 * @dev Define props interface for @var {UserInfoCard} component.
 */
export type UserInfoCardProps = {
  userId: string;
};
