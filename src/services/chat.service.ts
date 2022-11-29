import {
  Firestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { CreateChatRoomDto, CreateUserChatDto } from "@/src/dto/chatroom.dto";
import { ChatRoomEntity, UserChatEntity } from "@/src/entities/chatroom.entity";
import {
  chatRoomCollection,
  userChatCollection,
} from "@/src/actions/firebase.action";

export class ChatService {
  /**
   * @dev FireStore provider injected.
   */
  private readonly fireStoreProvider: Firestore;

  /**
   * @dev Initilize service.
   * @param {Firestore} fireStoreProvider.
   */
  constructor(fireStoreProvider: Firestore) {
    /** @dev Import FireStore provider. */
    this.fireStoreProvider = fireStoreProvider;
  }

  /**
   * @dev Create chat room.
   * @param {CreateChatRoomDto} createChatRoomDto.
   */
  public async createChatRoom(createChatRoomDto: CreateChatRoomDto) {
    try {
      const { senderId, reciverId } = createChatRoomDto;

      /** @dev Create combineid from id of sender and recive. */
      const combinedId =
        senderId.length > reciverId.length
          ? senderId + reciverId
          : reciverId + senderId;

      /** @dev Check whether the group(chats in firestore) exists, if not create. */
      if (!(await this.findChatRoomById(combinedId))) {
        /** @dev Create chatroom with combineId. */
        await setDoc(doc(chatRoomCollection, combinedId), {
          messages: [],
        });

        /** @dev Create chatroom info for sender & reciver */
      }
    } catch {}
  }

  /**
   * @dev Create user chat info.
   * @param {CreateUserChatDto} createUserChatDto
   * @returns {Function}
   */
  public async createUserChat(createUserChatDto: CreateUserChatDto) {
    return setDoc(doc(userChatCollection), {
      ...createUserChatDto,
      date: serverTimestamp(),
    });
  }

  /**
   * @dev Find chat rooom in database with id.
   * @param {string} id.
   * @returns {ChatRoomEntity} data.
   */
  public async findChatRoomById(id: string): Promise<ChatRoomEntity> {
    const chatroom = getDoc(doc(chatRoomCollection, id));
    if (!(await chatroom).exists()) {
      return null;
    }
    return (await chatroom).data();
  }

  /**
   * @dev The function to listen updates of chatroom.
   * @param {string} chatRoomId
   * @param {Function} next
   * @returns {Function}
   */
  public onMessage(chatRoomId: string, next: (data: ChatRoomEntity) => void) {
    const ref = doc(chatRoomCollection, chatRoomId);

    /** @dev Call callback function. */
    onSnapshot(ref, (doc) => {
      next(doc.data());
    });
  }

  /**
   * @dev The function to list updates of UserChatEntity
   */
  public async onUserChats(
    userId: string,
    next: (data: UserChatEntity[]) => void
  ) {
    try {
      /** @dev Query chats by userId. */
      const _query = await query(
        userChatCollection,
        where("userId", "==", userId)
      );

      onSnapshot(_query, (querySnapshot) => {
        /** @dev Initilize data to returns. */
        const data: UserChatEntity[] = [];

        /** @dev Loop in snapshot and passing to data. */
        querySnapshot.forEach((doc) => {
          try {
            data.push(doc.data());
          } catch {}
        });
        next(data);
      });
    } catch {}
  }

  /**
   * @dev Find chats by userId.
   * @param {string} userId
   * @returns {UserChatEntity} data.
   */
  public async findChatsByUserid(userId: string): Promise<UserChatEntity[]> {
    try {
      /** @dev Query chats by userId. */
      const _query = await query(
        userChatCollection,
        where("userId", "==", userId)
      );

      /** @dev Initilize data to returns. */
      const data: UserChatEntity[] = [];

      /** @dev Get docs with _query already process above and push into arrays. */
      (await getDocs(_query)).forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } catch (err) {
      console.error(`Error when query UserChats table by userId: ${err}`);
      throw err;
    }
  }
}
