import { doc, setDoc, getDoc } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { AuthService } from "@/src/services/auth.service";
import { userCollection } from "@/src/actions/firebase.action";
import { StorageProvider } from "@/src/providers/storage.provider";
import { CreateUserDto } from "@/src/dto/create-user.dto";
import { UserEntity } from "@/src/entities/user.entity";

export class UserService {
  /**
   * @dev Auth provider injected.
   */
  private readonly authProvider: Auth;

  /**
   * @dev Auth service injected.
   */
  private readonly authService: AuthService;

  /**
   * @dev Storage provider injected.
   */

  /**
   * @dev Initilize service.
   * @param {Auth} authProvider.
   * @param {StorageProvider} storageProvider.
   */
  constructor(authProvider: Auth, storageProvider: StorageProvider) {
    /** @dev Import auth provider. */
    this.authProvider = authProvider;

    /** @dev Import storage provider. */
    this.authService = new AuthService(authProvider, storageProvider, this);
  }

  /**
   * @dev Get profile.
   */
  public async getProfile() {
    const user = this.authProvider.currentUser;
    if (!user) {
      return await this.authService.getStoredCredentials();
    }
    return user;
  }

  /**
   * @dev Create user.
   * @param {CreateUserDto} createUserDto.
   * @returns {Function}
   */
  public async createUser(createUserDto: CreateUserDto) {
    if (await this.findUserByUid(createUserDto.uid)) {
      throw new Error("User already exists");
    }
    return setDoc(doc(userCollection, createUserDto.uid), createUserDto);
  }

  /**
   * @dev Find user by uid.
   * @param {string} uid.
   * @returns {UserEntity} data.
   */
  public async findUserByUid(uid: string): Promise<UserEntity> {
    /** Get res with doc by uid. */
    const res = await getDoc(doc(userCollection, uid));
    if (!res.exists()) {
      return null;
    }
    return res.data();
  }
}
