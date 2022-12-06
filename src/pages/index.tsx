import { useState, useEffect, FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { DashboardPageProvider } from "@/src/hooks/pages/dashboard";
import { ProposalExploreItem } from "@/src/components/proposal-item";
import { categoryOptions } from "@/src/utils/constants";
import { Banner } from "@/src/components/homepage";
import { SearchIcon } from "@/src/components/icons";
import { Col, Input, Row } from "antd";
import { Button } from "@hamsterbox/ui-kit";
import Select from "@/src/components/select";
import { useDispatch } from "react-redux";
import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";

const Layout: FC = () => {
  /**
   * @dev Dispatch hook.
   */
  const dispatch = useDispatch();

  /**
   * @dev The condition to display filter in mobile.
   */
  const [mobileFilterDisplayed, setMobileFilterDisplayed] = useState(false);

  /**
   * @dev Define proposal list to show.
   */
  const [exploreProposals, setExploreProposals] = useState<
    SwapProposalEntity[]
  >([]);

  /** @dev Get explore proposal list */
  useEffect(() => {
    (async () => {
      dispatch(
        getExploreProposals((proposals) => {
          setExploreProposals(proposals);
        })
      );
    })();
  }, []);

  console.log(exploreProposals);

  return (
    <MainLayout>
      <Banner />
      <div className={styles.container}>
        <div className="bg-white">
          <div>
            {mobileFilterDisplayed && (
              <div
                className="relative z-2000 lg:hidden"
                role="dialog"
                aria-modal="true"
                style={{ zIndex: 2000 }}
              >
                <div className="fixed inset-0 bg-black bg-opacity-25"></div>
                <div className="fixed inset-0 z-40 flex">
                  <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFilterDisplayed(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <form className="mt-4 border-t border-gray-200">
                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                            aria-controls="filter-section-mobile-1"
                            aria-expanded="false"
                          >
                            <span className="font-medium text-gray-900">
                              Category
                            </span>
                            <span className="ml-6 flex items-center">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-mobile-1">
                          <div className="space-y-6">
                            {categoryOptions.map((item, index) => (
                              <div
                                className="flex items-center"
                                key={`catogo-mobile-${index}`}
                              >
                                <input
                                  id="filter-mobile-category-0"
                                  name="category[]"
                                  value="new-arrivals"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor="filter-mobile-category-0"
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between pt-24 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Active Swaps
                </h1>
                <div className="w-[550px] flex">
                  <Input
                    size="middle"
                    className="!rounded-3xl"
                    placeholder="Search by NFT name, collection, game, seller"
                    prefix={<SearchIcon />}
                  />
                  <div className="ml-4">
                    <Button
                      className="!rounded-[100px] after:!rounded-[100px] !px-[30px] mx-auto"
                      text="Search"
                      shape="secondary"
                      size="middle"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>

              <section aria-labelledby="products-heading" className="pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="flex">
                  <span className="font-bold mr-4">Filter</span>
                  <span className="regular-text text-indigo-600">Reset</span>
                </div>

                <Row className="my-4" gutter={20}>
                  <Col span={8}>
                    <Select
                      mode="multiple"
                      className="text-center rounded-3xl text-sm"
                      placeholder={
                        <div className="w-full regular-text text-center">
                          Reputation advertisers
                        </div>
                      }
                      values={["No Reputation"]}
                      options={[
                        {
                          value: "Reputation",
                        },
                        {
                          value: "No Reputation",
                        },
                      ]}
                    ></Select>
                  </Col>
                  <Col span={8}>
                    <Select
                      mode="multiple"
                      className="text-center rounded-3xl text-sm"
                      placeholder={
                        <div className="w-full regular-text text-center">
                          All payment type
                        </div>
                      }
                      values={["Paypal", "Stripe"]}
                      options={[
                        {
                          value: "Bank transfer",
                        },
                        {
                          value: "Paypal",
                        },
                        {
                          value: "Stripe",
                        },
                      ]}
                    ></Select>
                  </Col>
                  <Col span={8}>
                    <Select
                      mode="multiple"
                      className="text-center rounded-3xl text-sm"
                      placeholder={
                        <div className="w-full regular-text text-center">
                          Include Guaranted payment
                        </div>
                      }
                      values={["Include Guaranted payment"]}
                      options={[
                        {
                          value: "Include Guaranted payment",
                        },
                        {
                          value: "No Guaranted payment",
                        },
                      ]}
                    ></Select>
                  </Col>
                </Row>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-8">
                    <div className="rounded-lg  lg:h-full px-[10px] py-[20px]">
                      <ProposalExploreItem receiveItems={[]} swapItems={[]} />
                      <ProposalExploreItem
                        receiveItems={[]}
                        swapItems={[]}
                        isGuaranteedPayment
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
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
