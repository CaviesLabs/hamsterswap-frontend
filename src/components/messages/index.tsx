import { FC, useState } from "react";
import StyledMessages from "./messages.style";
import { utilsProvider } from "@/src/utils/utils.provider";
import { UserAvatarMessage } from "@/src/components/messages/avatar";
import classnames from "classnames";
import { Button, Input } from "antd";

const Messages: FC = () => {
  const [closed, setClosed] = useState(false);
  const [opened, setOpened] = useState(true);

  if (closed) return null;
  return (
    <StyledMessages>
      <div className="container max-w-7xl mx-auto flex flex-row-reverse">
        <div className="bg-purple w-[460px] rounded-t-lg">
          <UserAvatarMessage
            opened={opened}
            setOpened={setOpened}
            setClosed={() => setClosed(true)}
            avatar="https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg"
            walletAddress={utilsProvider.makeShort(
              "F8qedeJsnrFnLfKpT4QN3GeAQqQMtq4izNLR1dKb5eRS",
              4
            )}
          />
          <div className={classnames("message-body", opened && "open")}>
            <div className="conversation">
              <div className="timing">22 Nov 2022, 17:47</div>
              <div className="message-row">
                <div className="message-wrap message--left">
                  <div className="message">
                    Lorem ipsum dolor sit amet consectetur. Faucibus volutpat
                    velit aliquam praesen
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
        </div>
      </div>
    </StyledMessages>
  );
};

export default Messages;
