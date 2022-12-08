import styles from "./banner.module.scss";
import { Button } from "@hamsterbox/ui-kit";
import { useRouter } from "next/router";
import classnames from "classnames";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useConnectedWallet } from "@saberhq/use-solana";

export function Banner() {
  const router = useRouter();
  const { connect } = useWalletKit();
  const wallet = useConnectedWallet();

  return (
    <div className={styles.bannerWrap}>
      <div className="lg:max-w-[1180px] mx-auto h-full relative">
        <div className="absolute md:top-22 xl:top-40 w-full">
          <div className="w-full flex justify-center">
            <div className="relative">
              <div
                className={classnames(
                  styles.heading,
                  "md:-left-14 md:w-28",
                  "lg:-left-20 lg:w-36",
                  "xl:-left-24 xl:w-44"
                )}
              >
                <img src="/assets/images/astronaunt-hamster.png" />
              </div>
            </div>
          </div>
        </div>
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
                wallet ? router.push("create-proposal") : connect()
              }
              theme={{
                backgroundColor: "transparent",
                color: "white",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
