import { SearchInputProps } from "@/src/components/search/types";
import styles from "./banner.module.scss";
import { Button } from "@hamsterbox/ui-kit";
import { useRouter } from "next/router";

export function Banner(props: SearchInputProps) {
  const router = useRouter();

  return (
    <div className={styles.bannerWrap}>
      <div className="lg:max-w-[1180px] mx-auto h-full flex">
        <div className="w-3/4 relative h-full">
          <div className={styles.heading}>
            <h1 className="text-6xl leading-tight">
              Trustless P2P Swaps for Digital Collectibles and Assets
            </h1>
          </div>
          <div className="absolute left-0 bottom-40">
            <Button
              className="!rounded-[100px] after:!rounded-[100px] !px-[20px] mt-4"
              text="Create a Proposal"
              size="large"
              onClick={() => router.push("create-proposal")}
            />
          </div>
        </div>
        <div className="h-full flex items-center">
          <img src="/assets/images/banner.png" />
        </div>
      </div>
    </div>
  );
}
