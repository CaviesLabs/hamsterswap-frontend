import styles from "./banner.module.scss";
import { Button } from "@hamsterbox/ui-kit";
import { useRouter } from "next/router";

export function Banner() {
  const router = useRouter();

  return (
    <div className={styles.bannerWrap}>
      <div className="lg:max-w-[1180px] mx-auto h-full flex items-center">
        <div className="w-3/5">
          <h1 className="text-6xl leading-tight">
            Trustless P2P Swaps for Digital Collectibles and Assets
          </h1>
          <Button
            className="!rounded-[100px] after:!rounded-[100px] !px-[20px] mt-4"
            text="Create a Proposal"
            size="large"
            onClick={() => router.push("create-proposal")}
          />
        </div>
        <div className="w-2/5 h-full flex items-center relative">
          <div className={styles.heading}>
            <img src="/assets/images/banner.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
