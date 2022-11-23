import { useState, useMemo, FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { DashboardPageProvider } from "@/src/hooks/pages/dashboard";
import { ProposalItem } from "@/src/components/proposal-item";
import Messages from "@/src/components/messages";

const Layout: FC = () => {
  const [mobileFilterDisplayed, setMobileFilterDisplayed] = useState(false);
  const [sortPopupDisplayed, setSortPopupDisplayed] = useState(false);

  /**
   * @dev Define value data to sort NFTs.
   */
  const sortOptions = useMemo(
    () => [
      { value: "most_popular", name: "Most Popular" },
      { value: "best_rating", name: "Best Rating" },
      { value: "newest", name: "Newest" },
      { value: "low_to_hight", name: "Low to high" },
      { value: "hight_to_low", name: "Hight to low" },
    ],
    []
  );

  /**
   * @dev Define value datas to filter NFTs by category.
   */
  const categoryOptions = useMemo(
    () => [
      { value: "top", name: "Top" },
      { value: "art", name: "Art" },
      { value: "collectibles", name: "Collectibles" },
      { value: "domain_names", name: "Domain Names" },
      { value: "music", name: "Music" },
      { value: "sports", name: "Sports" },
    ],
    []
  );

  return (
    <MainLayout>
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
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
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
              <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Advertisers
                </h1>
                <div className="flex items-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                        id="menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() =>
                          setSortPopupDisplayed(!sortPopupDisplayed)
                        }
                      >
                        Sort
                        <svg
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {sortPopupDisplayed && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                      >
                        <div className="py-1" role="none">
                          {sortOptions.map((item, index) => (
                            <a key={`sortitem-${index}`}>
                              <a
                                href="#"
                                className="font-medium text-gray-900 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                              >
                                {item.name}
                              </a>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFilterDisplayed(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-8">
                    <div className="h-96 rounded-lg  lg:h-full px-[10px] py-[20px]">
                      <ProposalItem />
                      <ProposalItem />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      <Messages />
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
