import { FC, ReactNode } from "react";
import { useMain } from "@/src/hooks/pages/main";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import AuthMiddleware from "@/src/components/middlewares/auth";
import animationData from "@/src/components/icons/animation-loading.json";
import Lottie from "react-lottie";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { transitionLoading } = useMain();

  return (
    <AuthMiddleware>
      <div className="main-layout">
        <Header />
        <div className="layout-content">{children}</div>
        <Footer />
      </div>
      {transitionLoading && (
        <div
          className="w-[185px] fixed bottom-[20px] right-[81px]"
          style={{ zIndex: 100 }}
        >
          <Lottie
            options={{
              animationData,
            }}
          />
        </div>
      )}
    </AuthMiddleware>
  );
};

export default MainLayout;
