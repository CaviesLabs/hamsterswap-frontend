import { FC, useMemo, useState, useCallback, useRef } from "react";
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

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  AddCashModal,
  AddGameItemModal,
  AddNftModal,
  AddSolModal,
} from "../components/modal";

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

  /**
   * @dev Swap options.
   */
  const swapOptions = useMemo(
    () => [
      {
        name: "#911",
        collection: "Maya Spirits",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
        nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
      },
      {
        name: "#911",
        collection: "Maya Spirits",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
        nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
      },
      {
        name: "#911",
        collection: "Maya Spirits",
        image:
          "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
        nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
        collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
      },
    ],
    []
  );

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
                      />
                      <Button
                        text="Add SOL"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] ml-[12px]"
                        theme={{
                          backgroundColor: "#41ADD1",
                          color: "#FFFFFF",
                        }}
                        icon={<PlustIcon />}
                      />
                      <Button
                        text="Add in-game item"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[250px] ml-[12px]"
                        theme={{
                          backgroundColor: "#F47048",
                          color: "#FFFFFF",
                        }}
                        icon={<PlustIcon />}
                      />
                      <Button
                        text="Add Cash"
                        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] ml-[12px]"
                        theme={{
                          backgroundColor: "#97B544",
                          color: "#FFFFFF",
                        }}
                        icon={<PlustIcon />}
                      />
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="flow-root">
            <div className="float-right">
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
