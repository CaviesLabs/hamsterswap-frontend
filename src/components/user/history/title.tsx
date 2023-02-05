import { Col, Row } from "antd";

function Title() {
  return (
    <Row className="text-gray-500 mt-5 mb-2 font-bold text-[16px]">
      <Col span={5} className="text-[16px]">
        Date
      </Col>
      <Col span={6} className="text-[16px]">
        Swap Items
      </Col>
      <Col span={6} className="text-[16px]">
        Receive Items
      </Col>
      <Col span={4} className="text-[16px]">
        Swapper
      </Col>
      <Col span={3} className="text-[16px]">
        Status
      </Col>
    </Row>
  );
}

export default Title;
