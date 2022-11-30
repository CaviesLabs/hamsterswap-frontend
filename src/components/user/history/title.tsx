import { Col, Row } from "antd";

function Title() {
  return (
    <Row className="text-gray-500 mt-5 mb-2 font-bold">
      <Col span={5}>Date</Col>
      <Col span={6}>Swap Items</Col>
      <Col span={6}>Receive Items</Col>
      <Col span={4}>Swapper</Col>
      <Col span={3}>Status</Col>
    </Row>
  );
}

export default Title;
