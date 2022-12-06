import { FC, useEffect } from "react";
import { ExpectedItem } from "@/src/components/create-proposal/step2/expected-item";
import { useDispatch } from "react-redux";
import { getPlatformConfig } from "@/src/redux/actions/platform-config/platform.action";

export const Step2: FC = () => {
  /**
   * Initialize platform config
   */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlatformConfig());
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Expected Items
      </h3>
      <p className="regular-text text-[16px] text-dark60">
        Max 3 options per swap.
      </p>
      <div className="block mt-[20px]">
        <ExpectedItem index={0} optionName="Option 1" defaultCollapsed />
        <ExpectedItem index={1} optionName="Option 2" />
        <ExpectedItem index={2} optionName="Option 3" />
      </div>
    </div>
  );
};
