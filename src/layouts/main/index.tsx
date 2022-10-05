import { FC, ReactNode } from "react";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="layout-content">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
