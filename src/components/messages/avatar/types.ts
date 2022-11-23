export type UserAvatarCardItemProps = {
  className?: string;
  walletAddress: string;
  avatar: string;
  opened: boolean;
  setOpened: (newState: boolean) => void;
  setClosed: () => void;
};
