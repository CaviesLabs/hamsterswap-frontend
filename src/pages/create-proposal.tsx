import { FC, useState, useCallback, useRef } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProposalDetailPageProvider } from "@/src/hooks/pages/proposal-detail";
import { LayoutSection } from "@/src/components/layout-section";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { Button } from "@hamsterbox/ui-kit";
import { StepProgressBar } from "@/src/components/stepper";
import type { StepProgressHandle } from "@/src/components/stepper";
import { PlustIcon } from "@/src/components/icons";
import { RowEditNftItem } from "@/src/components/nfts";
import { Carousel } from "react-responsive-carousel";
import { swapOptions, TIME_ARRAYS } from "@/src/utils";
import { ExpectedItem } from "@/src/components/expected-item";
import { ProposalItem } from "@/src/components/proposal-item";
import {
  AddCashModal,
  AddGameItemModal,
  AddNftModal,
  AddSolModal,
} from "../components/modal";
import { DatePicker } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Layout: FC = () => {
  /**
   * @dev Define step state.
   */
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * @dev handle open modal by type
   */
  const [isAddNft, setIsAddNft] = useState(false);
  const [isAddSol, setIsAddSol] = useState(false);
  const [isAddGameItem, setIsAddGameItem] = useState(false);
  const [isAddCash, setIsAddCash] = useState(false);

  /** @dev Condition to show time select. */
  const [timeSelectDisplayed, setTimeSelectDisplayed] = useState(false);
  const [timeSelected, selectTime] = useState("00:00");

  /** @dev Initilize ref for stepper component. */
  const stepperRef = useRef<StepProgressHandle>(null);

  /**
   * @dev The function to process when click next.
   * @returns {Function}
   */
  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
    stepperRef.current.nextHandler();
  }, [currentStep]);

  /**
   * @dev The function to process when click previous.
   * @returns {Function}
   */
  const handleBackStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    stepperRef.current.prevHandler();
  }, [currentStep]);

  function onFormSubmit() {
    return true;
  }
  return (
    <MainLayout>
      <div className="bg-white">
        <div className="cover-container bg-purpleBg">
          <LayoutSection className="!min-h-[350px]">
            <BreadCrumb data={["Home", "Create a Proposal"]} />
            <div className="mt-[20px] block md:flex">
              <p className="text-[32px]">Create a Proposal</p>
            </div>
            <div>
              <StepProgressBar
                ref={stepperRef}
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                  {
                    label: "Swap Items",
                    name: "Swap Items",
                  },
                  {
                    label: "Expect Items",
                    name: "Expect Items",
                  },
                  {
                    label: "Additional info",
                    name: "Additional info",
                  },
                  {
                    label: "Warranty",
                    name: "Warranty",
                  },
                  {
                    label: "Confirm",
                    name: "Confirm",
                  },
                ]}
              />
            </div>
          </LayoutSection>
        </div>
        <LayoutSection>
          <div className="mb-[20px]">
            <div className="block mt-[20px]">
              <div>
                <Carousel
                  autoPlay={false}
                  showIndicators={false}
                  selectedItem={currentStep}
                >
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                      Advertiser
                    </h3>
                    <p className="regular-text text-[16px] text-dark60">
                      Max 4 items per swap. Choose an item below to add:
                    </p>
                    <div className="block mt-[20px]">
                      <Button
                        text="Add NFT"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
                        icon={<PlustIcon />}
                        onClick={() => setIsAddNft(true)}
                      />
                      <AddNftModal
                        isModalOpen={isAddNft}
                        handleOk={() => {}}
                        handleCancel={() => {}}
                      />
                      <Button
                        text="Add SOL"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] ml-[12px]"
                        theme={{
                          backgroundColor: "#41ADD1",
                          color: "#FFFFFF",
                        }}
                        icon={<PlustIcon />}
                        onClick={() => setIsAddSol(true)}
                      />
                      <AddSolModal
                        isModalOpen={isAddSol}
                        handleOk={() => {}}
                        handleCancel={() => {}}
                      />
                      <Button
                        text="Add in-game item"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[250px] ml-[12px]"
                        theme={{
                          backgroundColor: "#F47048",
                          color: "#FFFFFF",
                        }}
                        icon={<PlustIcon />}
                        onClick={() => setIsAddGameItem(true)}
                      />
                      <AddGameItemModal
                        isModalOpen={isAddGameItem}
                        handleOk={() => {}}
                        handleCancel={() => {}}
                      />
                      <Button
                        text="Add Cash"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] ml-[12px]"
                        theme={{
                          backgroundColor: "#97B544",
                          color: "#FFFFFF",
                        }}
                        icon={<PlustIcon />}
                        onClick={() => setIsAddCash(true)}
                      />
                      <AddCashModal
                        isModalOpen={isAddCash}
                        handleOk={() => {}}
                        handleCancel={() => {}}
                      />
                    </div>
                    <div className="block mt-[20px]">
                      <div className="md:flex pt-[40px] flex-wrap">
                        {swapOptions.map((item, index) => (
                          <div
                            className="block md:left w-full md:w-[50%] md:pl-[20px]"
                            key={`swapoptions-${index}`}
                          >
                            <div className="flow-root items-center h-[50px]">
                              <p
                                className="semi-bold text-[16px] float-left"
                                style={{ transform: "translateY(50%)" }}
                              >
                                Item #{index + 1}
                              </p>
                            </div>
                            <div className="pt-[20px]">
                              <RowEditNftItem {...item} onDelete={() => {}} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                      Additional Info
                    </h3>
                    <div className="block mt-[60px]">
                      <div className="block mt-[60px]">
                        <p className="text-[16px] regular-text">
                          Proposal Note
                        </p>
                        <textarea
                          className="bg-[#F8F9FE] w-full min-h-[212px] p-[24px] rounded-[16px] mt-[12px] outline-0 focus:outline-0 focus:ring-0 regular-text focus:border-0"
                          placeholder="Additional Info"
                        />
                      </div>
                      <div className="mt-[60px]">
                        <p className="text-[16px] regular-text">
                          Expired time
                          <sup className="text-red300">*</sup>
                        </p>
                        <div className="mt-[12px] flex">
                          <div className="float-left">
                            <DatePicker
                              size="large"
                              className="rounded-[16px] px-[50px]"
                            />
                          </div>
                          <div className="float-left ml-[20px]">
                            <button
                              id="states-button"
                              data-dropdown-toggle="dropdown-states"
                              className="z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 focus:ring-0 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-44 rounded-[16px] text-center flow-root regular-text"
                              type="button"
                              onClick={() =>
                                setTimeSelectDisplayed((prev) => !prev)
                              }
                            >
                              {timeSelected}
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 ml-1 float-right"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </button>
                            {timeSelectDisplayed && (
                              <div className="relative">
                                <div className="z-4 bg-white divide-y divide-gray-100 rounded w-44 h-[255px] dark:bg-gray-700 top-[10px] relative">
                                  <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200 h-[255px] overflow-y-scroll rounded-[16px] border-[1px] border-solid border-dark10"
                                    aria-labelledby="states-button"
                                  >
                                    {TIME_ARRAYS.map((item, index) => (
                                      <li key={`prp-${index}`}>
                                        <button
                                          type="button"
                                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                          onClick={() => {
                                            setTimeSelectDisplayed(false);
                                            selectTime(item);
                                          }}
                                        >
                                          <p className="text-center relative left-[-10px] regular-text">
                                            {item}
                                          </p>
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                      Warranty
                    </h3>
                    <div className="block mt-[60px] flex">
                      <div className="block mt-[60px] float-left md:w-[65%] w-full pr-[20px] md:pr-[60px]">
                        <p className="text-[16px]">
                          What is Guaranteed payment?
                        </p>
                        <p className="text-[16px] regular-text mt-[12px]">
                          Lorem ipsum dolor sit amet consectetur. Dignissim
                          elementum pellentesque tristique purus felis eget non
                          nunc. Vitae nisl amet sed non in scelerisque. Platea
                          ac ut donec cras non nisl. Nec arcu gravida tellus
                          mattis.
                        </p>
                      </div>
                      <div className="mt-[60px] float-left md:w-[35%] w-full pl=[20px]">
                        <p className="text-[16px] regular-text">
                          Enter Guaranteed payment amount:
                        </p>
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
                            <span className="absolute right-[24px] top-[16px]">
                              SOL
                            </span>
                          </div>
                        </div>
                        <div className="mt-[12px] flex items-center">
                          <p className="regular-text text-[16px] float-left">
                            Your balance:
                          </p>
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
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                      Confirm
                    </h3>
                    <div className="block mt-[60px] flex">
                      <ProposalItem />
                    </div>
                    <div className="block mt-[60px] flex">
                      <div className="block mt-[60px] float-left md:w-[65%] w-full pr-[20px] md:pr-[60px]">
                        <p className="text-[16px]">
                          What is Guaranteed payment?
                        </p>
                        <p className="text-[16px] regular-text mt-[12px]">
                          Lorem ipsum dolor sit amet consectetur. Dignissim
                          elementum pellentesque tristique purus felis eget non
                          nunc. Vitae nisl amet sed non in scelerisque. Platea
                          ac ut donec cras non nisl. Nec arcu gravida tellus
                          mattis.
                        </p>
                      </div>
                      <div className="mt-[60px] float-left md:w-[35%] w-full pl=[20px]">
                        <p className="text-[16px] regular-text">
                          Enter Guaranteed payment amount:
                        </p>
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
                            <span className="absolute right-[24px] top-[16px]">
                              SOL
                            </span>
                          </div>
                        </div>
                        <div className="mt-[12px] flex items-center">
                          <p className="regular-text text-[16px] float-left">
                            Your balance:
                          </p>
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
                </Carousel>
              </div>
            </div>
          </div>
          <div className="flow-root">
            <div className="float-right">
              {currentStep > 0 && (
                <Button
                  text="Previous"
                  className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] float-right mr-[12px]"
                  shape="secondary"
                  onClick={handleBackStep}
                />
              )}
              <Button
                text="Next"
                className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] float-right"
                onClick={handleNextStep}
              />
            </div>
          </div>
        </LayoutSection>
      </div>
    </MainLayout>
  );
};

const ProposalDetailPage: NextPage = () => {
  return (
    <ProposalDetailPageProvider>
      <Layout />
    </ProposalDetailPageProvider>
  );
};

export default ProposalDetailPage;
