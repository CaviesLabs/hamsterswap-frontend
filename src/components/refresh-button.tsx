import { SyncOutlined as _SyncOutlined } from "@ant-design/icons";
import { Tooltip as AntdTooltip } from "antd";

const SyncOutlined = _SyncOutlined as any;
type RefreshButtonProps = {
  handleClick: () => void;
  loading: boolean;
};

export const RefreshButton = (props: RefreshButtonProps) => {
  return (
    <AntdTooltip
      placement="bottom"
      title="Click button to refresh the displayed data"
      className="ml-2 text-[12px]"
      overlayStyle={{
        maxWidth: 160,
        padding: 0,
      }}
      overlayInnerStyle={{
        fontSize: 12,
        textAlign: "center",
        padding: "20px 12px",
        border: "solid 1px #735CF7",
      }}
    >
      <button
        className="relative ml-4 border-solid border-[2px] border-purple300 text-purple300 rounded-full px-4 py-2 flex items-center"
        onClick={props.handleClick}
      >
        <SyncOutlined
          rev={null}
          spin={props.loading}
          style={{ fontSize: 18 }}
        />
        <p className="regular-text ml-4">Sync</p>
      </button>
    </AntdTooltip>
  );
};
