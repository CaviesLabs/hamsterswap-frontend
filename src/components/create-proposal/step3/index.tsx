import { FC } from "react";
import { Form } from "antd";
import DatetimePicker from "@/src/components/create-proposal/step3/datetime-picker";
import { setProposal } from "@/src/redux/actions/proposal/proposal.action";
import { useDispatch, useSelector } from "react-redux";

export const Step3: FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const { form } = props;

  const proposal = useSelector((state: any) => state.proposal);

  const handleFormChange = () => {
    dispatch(
      setProposal({
        ...proposal,
        additionalInfo: form.getFieldsValue(),
      })
    );
  };

  return (
    <Form
      onValuesChange={handleFormChange}
      form={form}
      layout="vertical"
      requiredMark={false}
    >
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Additional Info
      </h3>
      <div className="block mt-[60px]">
        <Form.Item name="note" label={<p className="text-lg">Proposal Note</p>}>
          <textarea
            className="bg-[#F8F9FE] w-full min-h-[212px] p-[24px] rounded-[16px] mt-[12px] outline-0 focus:outline-0 focus:ring-0 regular-text focus:border-0"
            placeholder="Additional Info"
          />
        </Form.Item>
        <Form.Item
          name="expiredAt"
          label={
            <p className="text-lg">
              Expired time <sup className="text-red300">*</sup>
            </p>
          }
          rules={[{ required: true, message: "Expired Time is required!" }]}
        >
          <DatetimePicker />
        </Form.Item>
      </div>
    </Form>
  );
};
