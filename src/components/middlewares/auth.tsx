import { FC, ReactNode, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getUser } from "@/src/redux/actions/user/user.action";

interface Props {
  children: ReactNode;
}

const AUTH_ROUTES = ["/", "/dashboard"];

const AuthMiddleware: FC<Props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuth = useCallback(() => {
    return !(AUTH_ROUTES.find((item) => router.asPath === item) === undefined);
  }, [router.asPath]);

  useEffect(() => {
    dispatch(
      getUser((user) => {
        if (user && !isAuth()) {
          return router.push("/");
        }
        if (!user && isAuth()) {
          return router.push("/login");
        }
      })
    );
  }, [router.asPath]);

  return <>{children}</>;
};

export default AuthMiddleware;
