import { useState, useEffect } from "react";
import { useRouter as useNextRouter } from "next/router";

/**
 * @dev Export state interface.
 */
export interface HookState {
  transitionLoading: boolean;
  fistLoading: boolean;
}

export const useRouter = (): HookState => {
  /**
   * @dev Declare state to detect fist loading page.
   */
  const [fistLoading, setFistLoading] = useState(true);

  /**
   * @dev Declare state to detect page transition.
   */
  const [transitionLoading, setTransitionLoading] = useState(false);

  /**
   * @dev Get NextJS router hook.
   */
  const router = useNextRouter();

  /**
   * @dev Watch router changes.
   */
  useEffect(() => {
    /**
     * @dev When router start changes.
     */
    const handleRouteChange = () => {
      setTransitionLoading(true);
    };

    /**
     * @dev When router complete changes.
     */
    const handleRouteComplete = () => {
      setTransitionLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [setTransitionLoading]);

  useEffect(() => {
    setTimeout(() => setFistLoading(false), 3000);
  }, []);

  return {
    transitionLoading,
    fistLoading,
  };
};
