import { FC, ReactNode } from "react";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import AuthMiddleware from "@/src/components/middlewares/auth";
// import { useMain } from "@/src/hooks/pages/main";
// import Messages from "@/src/components/messages";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  // const { user } = useMain();
  return (
    <AuthMiddleware>
      <div className="main-layout">
        <Header />
        <div className="layout-content">{children}</div>
        <Footer />
      </div>
      {/* {user && <Messages />} */}
    </AuthMiddleware>
  );
};

export default MainLayout;
