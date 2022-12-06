import { FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import Breadcrumb from "@/src/components/user/breadcrumb";
import SubMenu from "@/src/components/user/sub-menu";
import Title from "@/src/components/user/history/title";
import Proposal from "@/src/components/user/history/proposal";
import { ProposalItem } from "@/src/components/user/types";
import { useRouter } from "next/router";

const mockList: ProposalItem[] = [
  {
    id: "1",
    createdAt: "28/11/2022 20:30 UTC",
    swapItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    receiveItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    swapper: "EdeRcNsVGU1s1NXZZo8FhLD8iePxvoUCdbvwVGnj778f",
    status: "canceled",
  },
  {
    id: "2",
    createdAt: "30/11/2022 20:30 UTC",
    swapItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    receiveItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    swapper: "EdeRcNsVGU1s1NXZZo8FhLD8iePxvoUCdbvwVGnj778f",
    status: "expired",
  },
  {
    id: "3",
    createdAt: "29/11/2022 20:30 UTC",
    swapItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    receiveItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    swapper: "EdeRcNsVGU1s1NXZZo8FhLD8iePxvoUCdbvwVGnj778f",
    status: "success",
  },
  {
    id: "4",
    createdAt: "02/12/2022 20:30 UTC",
    swapItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    receiveItems: [
      {
        name: "CyBall Chicken #124",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "Nhac vuong kiem",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
      },
      {
        name: "1,000.00 SOL",
        image: "/assets/images/solana.svg",
      },
      {
        name: "2,000 USD",
        image: "/assets/images/solana.svg",
      },
    ],
    swapper: "EdeRcNsVGU1s1NXZZo8FhLD8iePxvoUCdbvwVGnj778f",
    status: "success",
  },
];
const Layout: FC = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <Breadcrumb title="History" />
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            {router.query.id && (
              <UserInfoCard userId={router.query.id as string} />
            )}
          </div>
        </div>
        <SubMenu curTab={1} />
        <div className="mt-10">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            History
          </h3>
          <Title />
          {mockList.map((_) => (
            <Proposal key={`proposal-${_.id}`} data={_} />
          ))}
        </div>
      </LayoutSection>
    </MainLayout>
  );
};

const HistoryPage: NextPage = () => {
  return (
    <ProfilePageProvider>
      <Layout />
    </ProfilePageProvider>
  );
};

export default HistoryPage;
