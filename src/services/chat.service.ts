import {
  Firestore,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  QueryDocumentSnapshot,
  arrayUnion,
} from "firebase/firestore";
import {
  CreateChatRoomDto,
  CreateUserChatDto,
  SendMessageDto,
  UpdateUserChatDto,
} from "@/src/dto/chatroom.dto";
import {
  ChatRoomEntity,
  UserChatEntity,
  MessageEntity,
} from "@/src/entities/chatroom.entity";
import {
  chatRoomCollection,
  userChatCollection,
} from "@/src/actions/firebase.action";
import { v4 as uuid } from "uuid";

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
      const { senderId, recieverId } = createChatRoomDto;

      /** @dev Create combineid from id of sender and recive. */
      const combinedId =
        senderId.length > recieverId.length
          ? senderId + recieverId
          : recieverId + senderId;

      /** @dev Check whether the group(chats in firestore) exists, if not create. */
      if (!(await this.findChatRoomById(combinedId))) {
        /** @dev Create chatroom with combineId. */
        await setDoc(doc(chatRoomCollection, combinedId), {
          messages: [],
        });
      }
    } catch (err) {
      console.error(err);
    }
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
   * @dev The function to update chat info for user.
   * @param {UpdateUserChatDto} updateUserChatDto
   */
  public async updateUserChat(updateUserChatDto: UpdateUserChatDto) {
    /** @dev Find doc with @var {userId} and @var {chatRoomId} */
    let doc = await this.findChatByUserIdAndChatRoomId(
      updateUserChatDto.userId,
      updateUserChatDto.chatRoomId
    );

    /** @dev If doc is not found, create new chat for user. */
    if (!doc) {
      await this.createUserChat({
        ...updateUserChatDto,
        displayName: updateUserChatDto.recieverId,
        photoURL: "https://avatars.hamsterbox.xyz/api/images/beam",
      });
    }

    /** @dev Get ref which recently create above. */
    doc = await this.findChatByUserIdAndChatRoomId(
      updateUserChatDto.userId,
      updateUserChatDto.chatRoomId
    );

    /** @dev Update ref with last message and update date now. */
    updateDoc(doc.ref, {
      lastMessage: updateUserChatDto.lastMessage,
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

  public async sendMessage(sendMesageDto: SendMessageDto) {
    /** @dev Check if the chatroom is not already exists in the database or create new one. */
    const chatRoomExist = await this.findChatRoomById(sendMesageDto.chatRoomId);
    if (!chatRoomExist) {
      await this.createChatRoom({
        senderId: sendMesageDto.userId,
        recieverId: sendMesageDto.recieverId,
      });
    }

    /** @dev Update chat for user 1. */
    await this.updateUserChat({
      ...sendMesageDto,
      lastMessage: {
        senderId: sendMesageDto.userId,
        message: sendMesageDto.message,
        seen: true,
      },
    });

    /** @dev Update chat for user 2. */
    await this.updateUserChat({
      ...sendMesageDto,
      recieverId: sendMesageDto.userId,
      userId: sendMesageDto.recieverId,
      lastMessage: {
        senderId: sendMesageDto.userId,
        message: sendMesageDto.message,
        seen: false,
      },
    });

    /** @dev Push message in chat room. */
    const ref = doc(chatRoomCollection, sendMesageDto.chatRoomId);
    await updateDoc(ref, {
      messages: arrayUnion(
        JSON.stringify({
          id: uuid(),
          date: Date.now().toString(),
          message: sendMesageDto.message,
          attached: sendMesageDto.attached,
          senderId: sendMesageDto.userId,
        })
      ),
    });
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
      if (!doc.exists()) return;
      const messageData: MessageEntity[] = [];
      doc.data().messages.map((item: any) => {
        messageData.push(JSON.parse(item) as MessageEntity);
      });
      next({ messages: messageData });
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
  public async findChatByUserIdAndChatRoomId(
    userId: string,
    chatRoomId: string
  ): Promise<QueryDocumentSnapshot<UserChatEntity>> {
    try {
      /** @dev Query chats by userId. */
      const _query = await query(
        userChatCollection,
        where("userId", "==", userId),
        where("chatRoomId", "==", chatRoomId)
      );

      /** @dev Initilize data to returns. */
      const data: QueryDocumentSnapshot<UserChatEntity>[] = [];

      /** @dev Get docs with _query already process above and push into arrays. */
      (await getDocs(_query)).forEach((doc) => {
        data.push(doc);
      });

      return data.length ? data[0] : null;
    } catch (err) {
      console.error(`Error when query UserChats table by userId: ${err}`);
      return null;
    }
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
