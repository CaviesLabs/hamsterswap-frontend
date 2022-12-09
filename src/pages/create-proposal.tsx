import { FC, useMemo, useCallback, useRef, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import MainLayout from "@/src/layouts/main";
import { CreateProposalProvider } from "@/src/hooks/pages/create-proposal";
import { LayoutSection } from "@/src/components/layout-section";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { Button, toast } from "@hamsterbox/ui-kit";
import { StepProgressBar } from "@/src/components/stepper";
import type { StepProgressHandle } from "@/src/components/stepper";
import { Carousel } from "react-responsive-carousel";
import { Form } from "antd";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
} from "@/src/components/create-proposal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classnames from "classnames";
import { StorageProvider } from "@/src/providers/storage.provider";
import { useConnectedWallet } from "@saberhq/use-solana";

const Layout: FC = () => {
  /**
   * @dev Use next router.
   */
  const router = useRouter();

  /**
   * @dev Import functions in screen context.
   */
  const {
    offferedItems,
    expectedItems,
    note,
    expiredTime,
    guaranteeSol,
    submitProposal,
  } = useCreateProposal();

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
  const [proposalId, setProposalId] = useState("");

  /** @dev Initilize ref for stepper component. */
  const stepperRef = useRef<StepProgressHandle>(null);

  /**
   * @dev This memo will use for condition whether allow to go next screen or not.
   * @param {number} currentStep
   * @param {offferedItems} @arrays
   */
  const isButtonNextDisabled = useMemo<boolean>(() => {
    switch (currentStep) {
      case 0:
        return offferedItems.length === 0;
      case 1:
        return (
          expectedItems.map((item) => item.askingItems).flat(1).length === 0
        );
      case 2:
        return !note || !expiredTime;
      case 3:
        return guaranteeSol <= 0;
      default:
        return true;
    }
  }, [
    currentStep,
    offferedItems,
    expectedItems,
    expiredTime,
    note,
    guaranteeSol,
  ]);

  /**
   * @dev The function to process when click next.
   * @returns {Function}
   */
  const handleNextStep = useCallback(async () => {
    try {
      if (currentStep === 2) {
        /**
         * @dev validate user has entered expire time
         * before going to next step
         */
        await formProposal.validateFields();
      }
      setCurrentStep((prev) => prev + 1);
      stepperRef.current.nextHandler();
    } catch {}
  }, [currentStep]);

  /**
   * @dev The function to process when click previous.
   * @returns {Function}
   */
  const handleBackStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    stepperRef.current.prevHandler();
  }, [currentStep]);

  /**
   * @dev Click submit to create proposal.
   */
  const hanndleSubmitProposal = async () => {
    try {
      const proposalId = await submitProposal();
      setProposalId(proposalId);
      setModalOpened(true);
    } catch (err: unknown) {
      toast.error("Create proposal failed", (err as any).message);
    }
  };

  function onFormSubmit() {
    return true;
  }

  /**
   * @description
   * Validate user authenticated and allow create proposal
   * if not, navigate user to homepage
   * trigger wallet when user disconnected with
   * need stop to wait local storage remove access token
   */
  const wallet = useConnectedWallet();
  useEffect(() => {
    setTimeout(() => {
      const storageProvider = new StorageProvider();
      const authen = storageProvider.getItem("hAccessToken");
      if (!authen) router.push("/");
    }, 500);
  }, [wallet]);

  return (
    <MainLayout>
      <div className="mb-44">
        <div className="cover-container bg-purpleBg">
          <LayoutSection className="!min-h-[350px]">
            <BreadCrumb data={["Home", "Create a Proposal"]} />
            <div className="mt-5 block md:flex">
              <p className="text-[32px]">Create a Proposal</p>
            </div>
            <div className="mt-[75px] pb-10">
              <StepProgressBar
                ref={stepperRef}
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                  {
                    label: "Your Items",
                    name: "Your Items",
                  },
                  {
                    label: "Expected Items",
                    name: "Expected Items",
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
                    setModalOpened={(v) => {
                      setModalOpened(v);
                      proposalId && router.push(`/proposal/${proposalId}`);
                    }}
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
                    isButtonNextDisabled && "hover:!text-black !cursor-default"
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
                  onClick={hanndleSubmitProposal}
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
    <CreateProposalProvider>
      <Layout />
    </CreateProposalProvider>
  );
};

export default ProposalDetailPage;
