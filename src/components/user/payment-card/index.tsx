import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import classnames from "classnames";
import {
  DeleteIcon,
  EditIcon,
  PaypalIcon,
  StripeIcon,
  VerticalDots,
  BankIcon,
} from "@/src/components/icons";
import { PaymentItem } from "@/src/components/user/types";

const mockList: PaymentItem[] = [
  {
    type: "paypal",
    label: "Paypal",
    name: "LE VIET HUNG",
    detail: "hung@cavies.xyz",
  },
  {
    type: "stripe",
    label: "Stripe",
    name: "LE VIET HUNG",
    detail: "hung@cavies.xyz",
  },
  {
    type: "bank",
    label: "Bank Transfer",
    name: "LE VIET HUNG",
    detail: "68.550.3838.6868 - MB Bank",
  },
];

const options: MenuProps["items"] = [
  {
    key: "edit",
    label: (
      <li
        className="cursor-pointer regular-text hover:text-gray-400 text-gray-900 px-4 py-2 text-sm flex items-center"
        role="menuitem"
        tabIndex={-1}
        onClick={() => {}}
      >
        <EditIcon className="mr-2" />
        Edit
      </li>
    ),
  },
  {
    key: "delete",
    label: (
      <li
        className="cursor-pointer regular-text text-red300 hover:text-red-400 px-4 py-2 text-sm flex items-center"
        role="menuitem"
        tabIndex={-1}
        onClick={() => {}}
      >
        <DeleteIcon className="mr-2 fill-red300 group-hover:fill-red-400" />
        Remove
      </li>
    ),
  },
];

export default function PaymentCard() {
  return (
    <Row gutter={[24, 24]} className="mt-10">
      {mockList.map((_, i) => (
        <Col span={12} key={`card-${i}`}>
          <div className="border rounded-2xl">
            <div
              className={classnames(
                "rounded-t-2xl flex items-center justify-between py-5 px-8",
                _.type === "paypal"
                  ? "bg-sky-200"
                  : _.type === "stripe"
                  ? "bg-purpleBg"
                  : "bg-orange-100"
              )}
            >
              <div className="flex items-center">
                <div className="pl-2 mr-14">
                  {_.type === "paypal" ? (
                    <PaypalIcon className="h-[42px]" />
                  ) : _.type === "stripe" ? (
                    <StripeIcon className="h-[42px]" />
                  ) : (
                    <BankIcon className="h-[42px]" />
                  )}
                </div>
                <div className="font-bold text-lg">{_.label}</div>
              </div>
              <Dropdown menu={{ items: options }} placement="bottomRight">
                <Button type="link">
                  <VerticalDots />
                </Button>
              </Dropdown>
            </div>
            <div className="pl-20 text-[16px] pt-4 pb-10">
              <div className="semi-bold">{_.name}</div>
              <div>{_.detail}</div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
