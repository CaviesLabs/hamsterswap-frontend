import { FC } from "react";
import { ExpectedItem } from "@/src/components/create-proposal/step2/expected-item";

export const Step2: FC = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Additional Info
      </h3>
      <p className="regular-text text-[16px] text-dark60">
        Max 3 options per swap.
      </p>
      <div className="block mt-[20px]">
        <ExpectedItem />
        <ExpectedItem />
        <ExpectedItem />
      </div>
    </div>
  );
};
