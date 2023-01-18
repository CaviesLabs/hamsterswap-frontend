import { FC, useRef, useCallback, useState } from "react";
import { Modal } from "antd";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { StepProgressBar } from "@/src/components/stepper";
import type { StepProgressHandle } from "@/src/components/stepper";

export const SubmitProposalModal: FC<AddItemModalProps> = (props) => {
  /** @dev Initilize ref for stepper component. */
  const stepperRef = useRef<StepProgressHandle>(null);

  /** @dev Step of function */
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * @dev The function to process when click next.
   * @returns {Function}
   */
  const handleNextStep = useCallback(async () => {
    try {
      setCurrentStep((prev) => prev + 1);
      stepperRef.current.nextHandler();
    } catch {}
  }, [currentStep]);

  return (
    <Modal
      title={<p className="text-2xl">Optimize transaction</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      destroyOnClose={true}
      className="hamster-modal"
    >
      <StyledModal>
        <div className="pt-6">
          <div>
            <p className="text-[16px] heading-[24px]">
              An optimization step is required to allow for swapping multiple
              items. This utilizes Solana’s{" "}
              <span className="underline">Versioned Transactions</span> format.
            </p>
          </div>
          <div className="mx-auto items-center max-w-3xl">
            <button onClick={handleNextStep} disabled={false}>
              Optimize
            </button>
          </div>
          <div>
            <StepProgressBar
              ref={stepperRef}
              startingStep={0}
              onSubmit={() => false}
              hiddenContent={true}
              theme={"secondary"}
              steps={[
                {
                  label: "Optimize transaction",
                  name: "Optimize transaction",
                },
                {
                  label: "Confirm transaction",
                  name: "Confirm transaction",
                },
              ]}
            />
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
