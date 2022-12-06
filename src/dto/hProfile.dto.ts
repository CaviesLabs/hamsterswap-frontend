/**
 * @dev Define hamster profile
 */
export class hProfileDto {
  id: string;
  avatar: string;
  walletAddress: string;

  ordersStat: {
    completedOrders: number;

    orders: number;
  };
}

/**
 * @dev Define update hamster profile
 */
export class hProfileContactDto {
  email: string;
  telegram: string;
  twitter: string;
}
