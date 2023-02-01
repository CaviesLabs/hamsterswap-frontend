import { FC, useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import Select from "@/src/components/select";
import { useDispatch } from "react-redux";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { SearchIcon } from "@/src/components/icons";
import { Button } from "@hamsterbox/ui-kit";

const Filter: FC = () => {
  const [search, setSearch] = useState("");
  // const [mobileFilterDisplayed, setMobileFilterDisplayed] = useState(true);

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
      <div className="flex items-center justify-between pt-24 pb-6">
        <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
          Active Swaps
        </h1>
        <div className="w-[558px] flex">
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
              width="100px"
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
            className="text-center rounded-3xl text-sm h-[44px]"
            placeholder={
              <div className="w-full regular-text text-center">
                Pro Advertisers
              </div>
            }
            values={["Pro Advertisers"]}
            options={[
              {
                value: "Pro Advertisers",
              },
              {
                value: "No Pro Advertisers",
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
            className="text-center rounded-3xl text-sm h-[44px]"
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
            className="text-center rounded-3xl text-sm h-[44px]"
            placeholder={
              <div className="w-full regular-text text-center">
                Include warranty
              </div>
            }
            values={["Include Guaranted payment"]}
            options={[
              {
                value: "Include warranty",
              },
              {
                value: "No include warranty",
              },
            ]}
          ></Select>
        </Col>
      </Row>
    </>
  );
};

export default Filter;
