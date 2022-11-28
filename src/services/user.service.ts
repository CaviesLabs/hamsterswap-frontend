import { doc, setDoc, getDoc } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { userCollection } from "@/src/actions/firebase.action";
import { CreateUserDto } from "@/src/dto/create-user.dto";
import { UserEntity } from "@/src/entities/user.entity";

export class UserService {
  /**
   * @dev Auth provider injected.
   */
  private readonly authProvider: Auth;

  /**
   * @dev Initilize service.
   * @param {Auth} authProvider.
   */
  constructor(authProvider: Auth) {
    /** @dev Import auth provider. */
    this.authProvider = authProvider;
  }

  /**
   * @dev Get profile.
   */
  public async getProfile() {
    const user = this.authProvider.currentUser;
    if (!user) {
      throw new Error("Unauthorized");
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
