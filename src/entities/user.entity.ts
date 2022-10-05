/**
 * @dev UserRole for hamsterbox account.
 */
export enum UserGroup {
  Gamer = "/gamer",
  Partner = "/partner",
}

/**
 * @dev Declare UserGroup ID
 */
export enum UserGroupID {
  Gamer = "4133975e-a941-4ee0-900d-28d291796a4c",
  Partner = "3228772c-4695-4931-8e1d-5e0afeb002bd",
}

/**
 * @dev User attributes.
 */
export class UserAttributes {
  avatar?: string;
  wallet?: string;
  nickname?: string;
  website?: string;
  locale?: string;
  birthdate?: string;
  middle_name?: string;
}

/**
 * @dev Keycloak user info.
 */
export class UserEntity {
  /**
   * @dev Email attribute is retrieved with `email` scope.
   */
  email: string;

  /**
   * @dev Profile attributes are retrieved with `profile` scope.
   */
  sub: string;
  email_verified: boolean;
  birthdate?: string;
  name?: string;
  family_name?: string;
  middle_name?: string;
  given_name?: string;
  nickname?: string;
  website?: string;
  locale?: string;
  avatar?: string;

  /**
   * @dev Wallet attribute is retrieved with `wallet` scope.
   */
  wallet?: string;

  /**
   * @dev Group attribute is retrieved with `group` scope.
   */
  group?: UserGroup[];
}
