import { FC } from "react";
import { Form } from "antd";
import DatetimePicker from "@/src/components/create-proposal/step3/datetime-picker";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";

/**
 * @dev Max length of note
 */
const MAX = 256;

export const Step3: FC<any> = (props: any) => {
  const { form } = props;

  /**
   * @dev Get functions from screen context.
   */
  const { note, setNote, setExpiredTime } = useCreateProposal();

  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Additional Info
      </h3>
      <div className="block mt-[60px]">
        <Form.Item name="note" label={<p className="text-lg">Proposal Note</p>}>
          <textarea
            className="bg-[#F8F9FE] w-full min-h-[212px] p-[24px] rounded-[16px] mt-[12px] outline-0 focus:outline-0 focus:ring-0 regular-text focus:border-0"
            placeholder="Additional Info"
            value={note}
            onChange={(e) =>
              e.target.value.length <= MAX && setNote(e.target.value)
            }
          />
          <p className="absolute right-[20px] bottom-[20px]">
            {note.length}/{MAX}
          </p>
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
          <DatetimePicker
            onChange={(value) => {
              setExpiredTime(value);
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
};
