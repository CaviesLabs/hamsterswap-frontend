import { FC, ReactNode, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_ROUTES = ["/", "/dashboard"];

const AuthMiddleware: FC<Props> = ({ children }) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAuth = useCallback(() => {
    return !(AUTH_ROUTES.find((item) => router.asPath === item) === undefined);
  }, [router.asPath]);

  useEffect(() => {
    /** @dev Do something related authentication */
  }, [router.asPath]);

  return <>{children}</>;
};

export default AuthMiddleware;
