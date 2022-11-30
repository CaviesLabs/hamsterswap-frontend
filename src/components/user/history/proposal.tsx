import { Col, Row, Tag } from "antd";
import { ProposalHistoryProps } from "@/src/components/user/types";
import { utilsProvider } from "@/src/utils";
import { DotIcon } from "@/src/components/icons";

function Proposal(props: ProposalHistoryProps) {
  const { data } = props;
  const status = data.status;
  return (
    <div className="border border-1 border-gray rounded-3xl py-4 mb-6">
      <Row className="pt-2">
        <Col span={5} className="text-lg">
          {data.createdAt}
        </Col>
        <Col span={6}>
          {data.swapItems.map((item, i) => (
            <div key={`swapItems-${i}`} className="flex items-center mb-3">
              <img className="w-10 rounded-lg" src={item.image} />
              <p className="ml-2 text-lg">{item.name}</p>
            </div>
          ))}

          <a href={"#"} className="text-md text-purple hover:underline">
            View Proposal
          </a>
        </Col>
        <Col span={6}>
          {data.receiveItems.map((item, i) => (
            <div key={`swapItems-${i}`} className="flex items-center mb-3">
              <img className="w-10 rounded-lg" src={item.image} />
              <p className="ml-2 text-lg">{item.name}</p>
            </div>
          ))}
        </Col>
        <Col span={4} className="text-lg">
          {utilsProvider.makeShort(data.swapper, 4)}
        </Col>
        <Col span={3}>
          <Tag
            className="w-min flex items-center capitalize"
            icon={<DotIcon className="mr-2" />}
            color={
              status === "canceled"
                ? "warning"
                : status === "success"
                ? "success"
                : "error"
            }
          >
            {status}
          </Tag>
        </Col>
      </Row>
    </div>
  );
}

export default Proposal;
