import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getFirestore,
  collection,
  Firestore,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthService } from "@/src/services/auth.service";
import { UserService } from "@/src/services/user.service";
import { getStorageProvider } from "@/src/providers";
import { ChatRoomEntity, UserChatEntity } from "@/src/entities/chatroom.entity";

const storageProvider = getStorageProvider();

/**
 * @dev Initialize configs from env configs.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

/** @dev Initilize app from configs. */
export const app = initializeApp({
  apiKey: "AIzaSyAgMlzKFXCchSeJUviFIFAjZ-HkH8eTbds",
  authDomain: "p2p-hamsterbox.firebaseapp.com",
  projectId: "p2p-hamsterbox",
  storageBucket: "p2p-hamsterbox.appspot.com",
  messagingSenderId: "99732594317",
  appId: "1:99732594317:web:8234ec8b19bfb6d7700cc4",
  measurementId: "G-GYG7DQE11J",
});

/** @dev Expose @var {Firestore} FireStoreProvider. */
export const firestoreProvider: Firestore = getFirestore();

/** @dev This is just a helper to add the type to the db responses. */
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(
    firestoreProvider,
    collectionName
  ) as CollectionReference<T>;
};

/** @dev Export chatroom collection. */
export const chatRoomCollection = createCollection<ChatRoomEntity>("ChatRooms");

/** @dev Export user-chat-info collection */
export const userChatCollection = createCollection<UserChatEntity>("UserChats");

/** @dev Expose @var {Auh} AuthProvider. */
export const authProvider = getAuth(app);

/** @dev Expose function to initilzize auth service. */
export const getAuthService = (): AuthService => {
  return new AuthService(authProvider, storageProvider);
};

/** @dev Expose function to initilzize auth and user service. */
export const getUserService = (): UserService => {
  return new UserService(authProvider);
};
