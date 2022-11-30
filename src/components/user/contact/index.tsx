import { Button, Input } from "@hamsterbox/ui-kit";
import { EmailIcon, TelegramIcon, TwitterIcon } from "@/src/components/icons";

export const ContactForm = () => {
  return (
    <>
      <p className="mt-4 mb-1 flex">
        <TelegramIcon />
        <div className="ml-2">Telegram</div>
      </p>
      <Input placeholder="Enter Telegram link" />
      <p className="mt-4 mb-1 flex">
        <TwitterIcon />
        <div className="ml-2">Twitter</div>
      </p>
      <Input placeholder="Enter Twitter link" />
      <p className="mt-4 mb-1 flex">
        <EmailIcon />
        <div className="ml-2">Email</div>
      </p>
      <Input placeholder="Enter email address" />

      <div className="mt-8 flex justify-end">
        <Button text="Update" shape="primary" className="!px-10" />
      </div>
    </>
  );
};
