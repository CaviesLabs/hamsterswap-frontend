import { Button, Input } from "@hamsterbox/ui-kit";
import { EmailIcon, TelegramIcon, TwitterIcon } from "@/src/components/icons";
import { Form } from "antd";
import { userService } from "@/src/redux/saga/user/user.service";
import { hProfileContactDto } from "@/src/dto/hProfile.dto";

export const ContactForm = () => {
  const onFinish = async (values: hProfileContactDto) => {
    await userService.updateUser(values);
  };

  return (
    <Form name="basic" initialValues={{}} onFinish={onFinish} layout="vertical">
      <Form.Item
        label={
          <p className="flex">
            <TelegramIcon />
            <div className="ml-2">Telegram</div>
          </p>
        }
        name="telegram"
      >
        <Input placeholder="Enter Telegram link" />
      </Form.Item>

      <Form.Item
        label={
          <p className="flex">
            <TwitterIcon />
            <div className="ml-2">Twitter</div>
          </p>
        }
        name="twitter"
      >
        <Input placeholder="Enter Twitter link" />
      </Form.Item>

      <Form.Item
        label={
          <p className="flex">
            <EmailIcon />
            <div className="ml-2">Email</div>
          </p>
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
