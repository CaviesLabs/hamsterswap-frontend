import { FC, useState } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import Breadcrumb from "@/src/components/user/breadcrumb";
import SubMenu from "@/src/components/user/sub-menu";
import { Button as HButton } from "@hamsterbox/ui-kit";
import { PlusIcon } from "@/src/components/icons";
import PaymentCard from "@/src/components/user/payment-card";
import { AddPaymentModal } from "@/src/components/user/modal/add-payment.modal";
import { useRouter } from "next/router";

const Layout: FC = () => {
  const router = useRouter();

  const [addPaymentVisible, setAddPaymentVisible] = useState(false);

  return (
    <MainLayout>
      <Breadcrumb title="Payment" />
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            {router.query.id && (
              <UserInfoCard userId={router.query.id as string} />
            )}
          </div>
        </div>
        <SubMenu curTab={3} />
        <div className="mt-10">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Payment
            </h3>
            <HButton
              onClick={() => setAddPaymentVisible(true)}
              text="Add payment method"
              icon={<PlusIcon />}
            />
            <AddPaymentModal
              handleCancel={() => setAddPaymentVisible(false)}
              handleOk={() => setAddPaymentVisible(false)}
              isModalOpen={addPaymentVisible}
            />
          </div>
          <PaymentCard />
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
