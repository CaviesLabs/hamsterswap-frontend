import { FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import Breadcrumb from "@/src/components/user/breadcrumb";
import SubMenu from "@/src/components/user/sub-menu";
import { ContactForm } from "@/src/components/user/contact";
import { useRouter } from "next/router";

const Layout: FC = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <Breadcrumb title="Profile" />
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            {router.query.id && (
              <UserInfoCard userId={router.query.id as string} />
            )}
          </div>
        </div>
        <SubMenu curTab={4} />
        <div className="mt-10">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Contacts
            </h3>
          </div>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </LayoutSection>
    </MainLayout>
  );
};

const PaymentPage: NextPage = () => {
  return (
    <ProfilePageProvider>
      <Layout />
    </ProfilePageProvider>
  );
};

export default PaymentPage;
