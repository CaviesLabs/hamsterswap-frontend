import { Button } from "@hamsterbox/ui-kit";
import { useRouter } from "next/router";
import classnames from "classnames";
import Lottie from "react-lottie";
import animationData from "./animationData.json";
import { useAppWallet, useConnect } from "@/src/hooks/useAppWallet";

export function Banner() {
  const router = useRouter();
  const { walletAddress } = useAppWallet();
  const { connect } = useConnect();

  return (
    <div className="relative bg-[#1c1254] md:h-[100vh]">
      <Lottie
        options={{
          animationData,
        }}
      />
      <div className="absolute bottom-3 md:bottom-6 xl:bottom-12 w-full">
        <div className="w-full flex justify-center">
          <Button
            className={classnames(
              "!rounded-[100px] after:!rounded-[100px] semi-bold",
              "!border !border-solid !border-white",
              "!p-4 !h-10 !text-[16px] md:!px-4 md:!py-1 md:!text-lg",
              "lg:!px-9 lg:!py-2 lg:!h-14 lg:!text-lg"
            )}
            text="Create a Proposal"
            size="large"
            shape="secondary"
            onClick={() =>
              walletAddress ? router.push("create-proposal") : connect()
            }
            theme={{
              backgroundColor: "transparent",
              color: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
}
