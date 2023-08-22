import { FC, useMemo, useCallback, useRef, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import MainLayout from "@/src/layouts/main";
import {
  CreateProposalProvider,
  useSubmitProposal,
} from "@/src/hooks/pages/create-proposal";
import { LayoutSection } from "@/src/components/layout-section";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { Button } from "@hamsterbox/ui-kit";
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
import { OptimizeTransactionModal } from "@/src/components/create-proposal/modal/optimize-transaction-modal";
import { SubmitProposalEvmModal } from "@/src/components/create-proposal/modal/submit-proposal-evm.modal";
import { StorageProvider } from "@/src/providers/storage.provider";
import { useAppWallet } from "@/src/hooks/useAppWallet";
import classnames from "classnames";
import { useSelector } from "@/src/redux";
import { ChainId } from "../entities/chain.entity";

const Layout: FC = () => {
  const router = useRouter();
  const { chainId } = useSelector();
  const { walletAddress } = useAppWallet();
  const { submit: submitProposal } = useSubmitProposal();
  const { offferedItems, expectedItems, note, expiredTime, guaranteeSol } =
    useCreateProposal();

  /**
   * @dev Define proposal form, that include:
   * @field note
   * @field expiredAt
   * Have to check form data before going to step 4
   */
  const [formProposal] = Form.useForm();

  /**
   * @dev Initilize state for control stepper
   * @field currentStep
   * @field modalOpened
   * @field proposalId
   * @field isDuringSubmit
   * @field optimizedProposalOpen - open modal to optimize transaction (only for solana)
   * @field stepperRef - ref to stepper component
   */
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const [proposalId, setProposalId] = useState("");
  const [isDuringSubmit, setIsDuringSubmit] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
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
  const hanndleSubmitProposal = useCallback(async () => {
    setIsDuringSubmit(true);
    setSubmitModalOpen(true);
  }, [
    router,
    expectedItems,
    offferedItems,
    note,
    expiredTime,
    guaranteeSol,
    walletAddress,
  ]);

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
  useEffect(() => {
    setTimeout(() => {
      const storageProvider = new StorageProvider();
      const authen = storageProvider.getItem("hAccessToken");
      if (!authen) router.push("/");
    }, 500);
  }, [walletAddress]);

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
                  size="large"
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
                      color: "white",
                      backgroundColor: "#94A3B8",
                    }
                  }
                  disabled={isButtonNextDisabled}
                  size="large"
                />
              ) : (
                <Button
                  text={isDuringSubmit ? "Confirming" : "Confirm"}
                  className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] float-right"
                  onClick={hanndleSubmitProposal}
                  loading={isDuringSubmit}
                  size="large"
                />
              )}
              {chainId === ChainId.solana ? (
                <OptimizeTransactionModal
                  isModalOpen={submitModalOpen}
                  instructionHandler={async () =>
                    (await submitProposal()) as unknown as {
                      proposalId?: string;
                      fns: {
                        optimize(): Promise<void>;
                        confirm(): Promise<void>;
                      };
                    }
                  }
                  handleCancel={() => {
                    setSubmitModalOpen(false);
                    setIsDuringSubmit(false);
                  }}
                  handleOk={(proposalId) => {
                    setSubmitModalOpen(false);
                    setProposalId(proposalId);
                    setModalOpened(true);
                    setIsDuringSubmit(false);
                  }}
                />
              ) : (
                <SubmitProposalEvmModal
                  isModalOpen={submitModalOpen}
                  handleCancel={() => {
                    setSubmitModalOpen(false);
                    setIsDuringSubmit(false);
                  }}
                  handleOk={() => {
                    setSubmitModalOpen(false);
                    setModalOpened(true);
                    setIsDuringSubmit(false);
                  }}
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
