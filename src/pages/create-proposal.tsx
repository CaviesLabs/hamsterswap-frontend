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
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
} from "@/src/components/create-proposal";
import { Form } from "antd";
import { useSelector } from "react-redux";
import classnames from "classnames";

const Layout: FC = () => {
  const proposal = useSelector((state: any) => state.proposal);
  const isButtonNextDisabled = !proposal || proposal?.swapItems.length === 0;

  /**
   * @dev Define proposal form, that include:
   * @field note
   * @field expiredAt
   * Have to check form data before going to step 4
   */
  const [formProposal] = Form.useForm();

  /**
   * @dev Define step state.
   */
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * @dev display modal when user confirm transaction successfully
   */
  const [modalOpened, setModalOpened] = useState(false);

  /** @dev Initilize ref for stepper component. */
  const stepperRef = useRef<StepProgressHandle>(null);

  /**
   * @dev The function to process when click next.
   * @returns {Function}
   */
  const handleNextStep = useCallback(async () => {
    if (currentStep === 2) {
      /**
       * @dev validate user has entered expire time
       * before going to next step
       */
      await formProposal.validateFields();
    }
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
                  <Step3 form={formProposal} />
                  <Step4 />
                  <Step5
                    modalOpened={modalOpened}
                    setModalOpened={(v) => setModalOpened(v)}
                  />
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
              {currentStep < 4 ? (
                <Button
                  text="Next"
                  className={classnames(
                    "!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] float-right",
                    isButtonNextDisabled && "hover:!text-black"
                  )}
                  onClick={handleNextStep}
                  theme={
                    isButtonNextDisabled && {
                      color: "black",
                      backgroundColor: "#cccccc",
                    }
                  }
                  disabled={isButtonNextDisabled}
                />
              ) : (
                <Button
                  text="Confirm"
                  className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] float-right"
                  onClick={() => setModalOpened(true)}
                />
              )}
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
