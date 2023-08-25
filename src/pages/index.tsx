/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { DashboardPageProvider } from "@/src/hooks/pages/dashboard";
import { ProposalExploreItem } from "@/src/components/proposal-item";
import { Banner } from "@/src/components/homepage";
import {
  SwapItemEntity,
  SwapOptionEntity,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { parseProposal } from "@/src/utils";
import Filter from "@/src/components/homepage/filter";
import { useMain } from "@/src/hooks/pages/main";

const Layout: FC = () => {
  const { platformConfig, proposals } = useMain();

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
                        return (
                          <ProposalExploreItem
                            key={proposal.id}
                            data={proposal}
                            isGuaranteedPayment
                            swapItems={proposal.offerItems.map(
                              (offerItem: SwapItemEntity) =>
                                parseProposal(
                                  offerItem,
                                  platformConfig?.allowCurrencies
                                )
                            )}
                            receiveItems={proposal.swapOptions.map(
                              (swapOption: SwapOptionEntity) => {
                                return {
                                  ...swapOption,
                                  items: swapOption.items.map((item) =>
                                    parseProposal(
                                      item,
                                      platformConfig?.allowCurrencies
                                    )
                                  ),
                                };
                              }
                            )}
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
