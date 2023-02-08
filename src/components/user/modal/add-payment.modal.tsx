import { FC, useState } from "react";
import { Modal } from "antd";
import { ModalProps } from "../../modal/types";
import Select from "@/src/components/select";
import { Input } from "@hamsterbox/ui-kit";

export const AddPaymentModal: FC<ModalProps> = (props) => {
  const [method, setMethod] = useState();

  return (
    <Modal
      title={<p className="text-2xl">Add payment method</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={550}
      footer={null}
      className="hamster-modal"
    >
      <div className="py-6">
        <div className="h-[500px] flex flex-col justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-dark60 text-lg mt-4">Select method *</p>
            <Select
              placeholder="Select method"
              values={[method]}
              options={[
                {
                  image: "/assets/images/payments/paypal.png",
                  value: "Paypal",
                },
                {
                  image: "/assets/images/payments/stripe.png",
                  value: "Stripe",
                },
                {
                  image: "/assets/images/payments/bank.png",
                  value: "Bank Transfer",
                },
              ]}
              onChange={(v) => setMethod(v)}
            />

            {(method === "Paypal" || method === "Stripe") && (
              <>
                <p className="text-dark60 text-lg mt-4">Account holder *</p>
                <Input placeholder="Enter account name" />
                <p className="text-dark60 text-lg mt-4">Email *</p>
                <Input placeholder="Enter paypal's email" />
              </>
            )}
            {method === "Bank Transfer" && (
              <>
                <p className="text-dark60 text-lg mt-4">Bank name *</p>
                <Input placeholder="Enter bank name" />
                <p className="text-dark60 text-lg mt-4">Account holder *</p>
                <Input placeholder="Enter account name" />
                <p className="text-dark60 text-lg mt-4">Account number *</p>
                <Input placeholder="Enter account number" />
              </>
            )}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={props.handleCancel}
              className="w-full !bg-purple !text-white border border-2 border-purple rounded-3xl text-lg font-bold py-3"
              disabled={!method}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
