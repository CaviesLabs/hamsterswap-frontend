import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { AuthService } from "@/src/services/auth.service";

/**
 * @dev Initialize configs from env configs.
 */
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
export const app = initializeApp(firebaseConfig);

/** @dev Expose @var {Auh} AuthProvider */
export const authProvider = getAuth(app);

/** @dev Expose function to initilzize auth service. */
export const getAuthService = (): AuthService => {
  return new AuthService(authProvider);
};
