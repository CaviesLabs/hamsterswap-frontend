export type UserAvatarCardItemProps = {
  className?: string;
  walletAddress: string;
  avatar: string;
  opened: boolean;
  curScreen: number;
  onBack(): void;
  setOpened: (newState: boolean) => void;
  setClosed: () => void;
};
