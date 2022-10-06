import { FC, ReactNode } from "react";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import AuthMiddleware from "@/src/components/middlewares/auth";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <AuthMiddleware>
      <div className="main-layout">
        <Header />
        <div className="layout-content">{children}</div>
        <Footer />
      </div>
    </AuthMiddleware>
  );
};

export default MainLayout;
