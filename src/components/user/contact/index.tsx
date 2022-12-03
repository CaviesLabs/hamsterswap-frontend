import { Button, Input } from "@hamsterbox/ui-kit";
import { EmailIcon, TelegramIcon, TwitterIcon } from "@/src/components/icons";
import { Form } from "antd";
import { userService } from "@/src/redux/saga/user/user.service";
import { hProfileContactDto } from "@/src/dto/hProfile.dto";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ContactForm = () => {
  const [form] = Form.useForm();

  const profile = useSelector((state: any) => state.hProfile);

  const onFinish = async (values: hProfileContactDto) => {
    await userService.updateUser(values);
  };

  useEffect(() => {
    profile && form.setFieldsValue(profile);
  }, [profile]);

  return (
    <Form
      form={form}
      name="basic"
      initialValues={profile}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label={
          <div className="flex">
            <TelegramIcon />
            <div className="ml-2">Telegram</div>
          </div>
        }
        name="telegram"
      >
        <Input placeholder="Enter Telegram link" />
      </Form.Item>
      <Form.Item
        label={
          <div className="flex">
            <TwitterIcon />
            <div className="ml-2">Twitter</div>
          </div>
        }
        name="twitter"
      >
        <Input placeholder="Enter Twitter link" />
      </Form.Item>
      <Form.Item
        label={
          <div className="flex">
            <EmailIcon />
            <div className="ml-2">Email</div>
          </div>
        }
        name="email"
        rules={[{ type: "email", message: "Wrong email address" }]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>
      <Form.Item className="mt-8 flex justify-end">
        <Button text="Update" shape="primary" className="!px-10" />
      </Form.Item>
    </Form>
  );
};
