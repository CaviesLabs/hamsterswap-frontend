import { FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { ProposalDetailPageProvider } from "@/src/hooks/pages/proposal-detail";
import { RowNftItem } from "@/src/components/nfts";
import Messages from "@/src/components/messages";

const Layout: FC = () => {
  return (
    <MainLayout>
      <div
        className={`${styles.container} mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-[20px] min-h-[60vh]`}
      >
        <div className="mb-[20px]">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Sell items
          </h3>
          <div className="block mt-[20px]">
            <RowNftItem
              name="#2332"
              collection="Maya Spirits"
              image="https://i.seadn.io/gae/M1L6jf3EZJZ0ep-0XPA6HxAWH1flQXwgkKwdHVabbMMCVyCBd3cwcwXLl9ZR8vEDFBQ0fbbA1bPUQY2T7t0xpomrS6LwhPVZ4d5jAw?auto=format&w=1000"
              nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
              collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
            />
            <RowNftItem
              name="#727"
              collection="Maya Spirits"
              image="https://i.seadn.io/gae/Hvnc2AXHYZi8vmLXMZhW66gEvFxKHXuzrFzebLyMCyraXa-QtJm4wniZ3tsA5-IZlZ1lv-CkkOpLQOLFxHiUdDMg9E2Cb8May2kuNA?auto=format&w=1000"
              nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
              collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
            />
            <RowNftItem
              name="#911"
              collection="Maya Spirits"
              image="https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750"
              nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
              collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
            />
          </div>
        </div>
        <div className="mb-[20px]">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Revice items
          </h3>
          <div className="block mt-[20px]">
            <RowNftItem
              name="#9924"
              collection="Monomyth"
              image="https://i.seadn.io/gae/KKMSj66V6UHOYJyub4i9R-VqPvVvgiXS97MIRMDoJ2fKrqnYWdvPhtwpdhVf9QRkFuj5zw6Xp9x0JIvkhMfNNg_1Sj_5DoZ3k8dQ0Q?auto=format&w=750"
              nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
              collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
            />
            <RowNftItem
              name="#9945"
              collection="Monomyth"
              image="https://i.seadn.io/gae/iojORs1W27RcmqsXV6STXgBzrcWJz5S6zb0cpHHnIfj9L0iNzj5FdjiuvIfsSMz9IRJ1nbbAiPq7FeSQ5A7gfF0PSiRuTLyznPTnW4k?auto=format&w=750"
              nftId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
              collectionId="0xbf69783fa630ed65d396dca51216a391a4bb1fd0"
            />
          </div>
        </div>
      </div>
      <Messages />
    </MainLayout>
  );
};

const ProposalDetailPage: NextPage = () => {
  return (
    <ProposalDetailPageProvider>
      <Layout />
    </ProposalDetailPageProvider>
  );
};

export default ProposalDetailPage;
