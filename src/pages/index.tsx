/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { DashboardPageProvider } from "@/src/hooks/pages/dashboard";
import { ProposalExploreItem } from "@/src/components/proposal-item";
import { Banner } from "@/src/components/homepage";
import { useSelector } from "react-redux";
import {
  SwapItemEntity,
  SwapOptionEntity,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { parseProposal } from "@/src/utils";
import { useMain } from "@/src/hooks/pages/main";
import Filter from "@/src/components/homepage/filter";

import { DUMMY_PROFILES, DUMMY_NFTS } from "@/src/utils/constants";
import { ConfirmTransactionModal } from "../components/modal";

const Layout: FC = () => {
  const [modal, setModal] = useState(true);
  const proposals = useSelector((state: any) => state.proposals);
  const {
    platformConfig: { allowCurrencies },
  } = useMain();

  return (
    <MainLayout>
      <Banner />
      <div className={styles.container}>
        <div className="bg-white mb-10">
          <div>
            <main className="mx-auto max-w-[86rem]">
              <section aria-labelledby="products-heading" className="pt-6">
                <Filter />
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-8">
                    <div className="rounded-lg  lg:h-full px-[10px] py-[20px]">
                      {proposals?.map((proposal: SwapProposalEntity) => {
                        const p: any = { ...proposal };
                        const newOfferItems = p.offerItems.map(
                          (offerItem: SwapItemEntity) =>
                            parseProposal(offerItem, allowCurrencies)
                        );
                        const newSwapOptions = p.swapOptions.map(
                          (swapOption: SwapOptionEntity) => {
                            return swapOption.items.map((_) =>
                              parseProposal(_, allowCurrencies)
                            );
                          }
                        );
                        p.offerItems = newOfferItems;
                        p.swapOptions = newSwapOptions;
                        return (
                          <ProposalExploreItem
                            key={p.id}
                            data={p}
                            receiveItems={p.offerItems}
                            swapItems={p.swapOptions}
                            isGuaranteedPayment
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      {/* <ConfirmTransactionModal
        isModalOpen={modal}
        handleOk={() => setModal(false)}
        handleCancel={() => setModal(false)}
        buyer={DUMMY_PROFILES[0]}
        seller={DUMMY_PROFILES[1]}
        nfts={DUMMY_NFTS}
      /> */}
    </MainLayout>
  );
};

const Home: NextPage = () => {
  return (
    <DashboardPageProvider>
      <Layout />
    </DashboardPageProvider>
  );
};

export default Home;
