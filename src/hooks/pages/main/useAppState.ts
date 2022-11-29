import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatService } from "@/src/actions/firebase.action";
import { setUserChats } from "@/src/redux/actions/user-chat/user-chat.action";
import State from "@/src/redux/entities/state";

export const useAppState = () => {
  /** @dev Import redux states. */
  const { user } = useSelector((state: State) => state);

  /** @dev Import dispatch hook to modify app states. */
  const dispatch = useDispatch();

  /** @dev Import services. */
  const chatService = getChatService();

  /** @dev Watch changes. */
  useEffect(() => {
    if (user) {
      /**
       * @dev Listen realtime updates from server in @var {UserChat} collection
       */
      chatService.onUserChats(user.uid, (userChats) => {
        dispatch(setUserChats(userChats));
      });
    }
  }, [user]);
};
