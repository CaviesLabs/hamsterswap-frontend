import { FC, useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import Select from "@/src/components/select";
import { categoryOptions } from "@/src/utils";
import { useDispatch } from "react-redux";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { SearchIcon } from "@/src/components/icons";
import { Button } from "@hamsterbox/ui-kit";

const Filter: FC = () => {
  const [search, setSearch] = useState("");
  const [mobileFilterDisplayed, setMobileFilterDisplayed] = useState(true);

  const dispatch = useDispatch();
  const handleSearch = (_search?: string) => {
    dispatch(
      getExploreProposals({
        options: {
          statuses: [SwapProposalStatus.DEPOSITED],
          search: _search,
        },
      })
    );
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleReset = () => {
    setSearch("");
  };

  return (
    <>
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
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="ml-4">
            <Button
              className="!rounded-[100px] after:!rounded-[100px] !px-[30px] mx-auto"
              text="Search"
              shape="secondary"
              size="middle"
              onClick={() => handleSearch(search)}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <span className="font-bold mr-4">Filter</span>
        <span
          className="regular-text text-indigo-600 cursor-pointer"
          onClick={() => handleReset()}
        >
          Reset
        </span>
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
            values={[]}
            options={[
              {
                value: "Reputation",
              },
              {
                value: "No Reputation",
              },
            ]}
            onChange={(value) => {
              console.log("choose", value);
            }}
          />
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
    </>
  );
};

export default Filter;
