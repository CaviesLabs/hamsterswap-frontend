import { FC } from "react";

export const Step4: FC = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Warranty
      </h3>
      <div className="block mt-[60px] flex">
        <div className="block float-left md:w-[65%] w-full pr-[20px] md:pr-[60px]">
          <p className="text-[16px]">What is warranty for?</p>
          <p className="text-[16px] regular-text mt-[12px]">
            Warranty is a guarantee deposit that one or both parties need to
            negotiate and agree upon. The responsible parties will then need to
            transfer the guarantee deposit into Hamsterswap’s smart contract to
            form the warranty for the relevant swap (or proposal). Once the swap
            is performed successfully and confirmed by both sides, the deposit
            will be returned accordingly.
          </p>
        </div>
        <div className="float-left md:w-[35%] w-full pl=[20px]">
          <p className="text-[16px] regular-text">Guarantee deposit amount:</p>
          <div className="mt-[12px]">
            <div className="relative">
              <input
                type="text"
                className="border-[1px] border-solid border-dark30 rounded-[16px] w-full  px-[64px] py-[16px] focus:ring-0 focus:outline-0 regular-text"
                placeholder="Enter SOL amount"
              />
              <img
                src="/assets/images/solana-icon.svg"
                alt="Solana Icon"
                className="!w-[24px] h-[24px] absolute left-[24px] top-[16px]"
              />
              <span className="absolute right-[24px] top-[16px]">SOL</span>
            </div>
          </div>
          <div className="mt-[12px] flex items-center">
            <p className="regular-text text-[16px] float-left">Your balance:</p>
            <img
              src="/assets/images/solana-icon.svg"
              alt="Solana Icon"
              className="!w-[16px] h-[16px] ml-[12px] float-left"
            />
            <p className="ml-[12px] text-[16px] ml-[12px] float-left">
              2,043.54 SOL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
