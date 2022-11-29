import { FC, useState, useCallback, useRef } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProposalDetailPageProvider } from "@/src/hooks/pages/proposal-detail";
import { LayoutSection } from "@/src/components/layout-section";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { Button } from "@hamsterbox/ui-kit";
import { StepProgressBar } from "@/src/components/stepper";
import type { StepProgressHandle } from "@/src/components/stepper";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Step1 } from "@/src/components/create-proposal/step1";
import { Step2 } from "@/src/components/create-proposal/step2";
import { Step3 } from "@/src/components/create-proposal/step3";
import { Step4 } from "@/src/components/create-proposal/step4";
import { Step5 } from "@/src/components/create-proposal/step5";

const Layout: FC = () => {
  /**
   * @dev Define step state.
   */
  const [currentStep, setCurrentStep] = useState(0);

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
            <div className="mt-5 block md:flex">
              <p className="text-[32px]">Create a Proposal</p>
            </div>
            <div className="mt-8">
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
                  <Step1 />
                  <Step2 />
                  <Step3 />
                  <Step4 />
                  <Step5 />
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
                text={currentStep < 4 ? "Next" : "Confirm"}
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
