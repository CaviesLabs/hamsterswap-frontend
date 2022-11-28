import { FC } from "react";
import { Button, Input } from "antd";

export const ConversationScreen: FC = () => {
  return (
    <div>
      <div className="conversation">
        <div className="timing">22 Nov 2022, 17:47</div>
        <div className="message-row">
          <div className="message-wrap message--left">
            <div className="message">
              Lorem ipsum dolor sit amet consectetur. Faucibus volutpat velit
              aliquam praesen
            </div>
          </div>
          <div className="message-wrap message--right">
            <div className="message">Ddonec habitant morbi id quis.</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full bg-white py-4 px-2">
        <Input
          bordered={false}
          placeholder="Type something"
          onClick={() => {}}
        />
        <Button type="primary" shape="round" className="bg-purple">
          Send
        </Button>
      </div>
    </div>
  );
};
