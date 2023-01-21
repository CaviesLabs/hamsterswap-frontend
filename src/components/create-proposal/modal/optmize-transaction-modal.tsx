import { FC, useRef, useCallback, useState, useEffect } from "react";
import { Modal } from "antd";
import { ModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { StepProgressBar } from "@/src/components/stepper";
import type { StepProgressHandle } from "@/src/components/stepper";
import { Button } from "@hamsterbox/ui-kit";
import { useWallet } from "@/src/hooks/useWallet";
import { toast } from "@hamsterbox/ui-kit";

export const OptimizeTransactionModal: FC<
  Omit<ModalProps, "handleOk"> & {
    handleOk(proposalId?: string): void;
    instructionHandler(): Promise<{
      proposalId?: string;
      fns: { optimize(): Promise<void>; confirm(): Promise<void> };
    }>;
  }
> = (props) => {
  /** @dev Loading UX. */
  const [loading, setLoading] = useState(false);

  /** @dev Proposal id. */
  const [proposalId, setProposalId] = useState("");

  /** @dev Inject all function releated to blockchain intergrate. */
  const { programService } = useWallet();

  /** @dev Initilize ref for stepper component. */
  const stepperRef = useRef<StepProgressHandle>(null);

  /** @dev Step of function */
  const [currentStep, setCurrentStep] = useState(0);

  /** @dev Declare optimize function here. */
  const [fnc, setFnc] = useState<{
    optimize(): Promise<void>;
    confirm(): Promise<void>;
  }>(null);

  /**
   * @dev Import functions in screen context.
   */
  // const { submitProposal } = useCreateProposal();

  /**
   * @dev The function to process when click next.
   * @returns {Function}
   */
  const handleNextStep = useCallback(async () => {
    console.log("proposalId", proposalId);
    try {
      setLoading(true);
      if (currentStep === 0) {
        /**
         * @dev Optimize transaction
         */
        try {
          fnc?.optimize && (await fnc?.optimize());
        } catch {
          toast("Failed to optimize transaction");
          return;
        }
      } else {
        /**
         * @dev Call confirm function if step is confirm step
         */
        try {
          fnc?.confirm && (await fnc?.confirm());
        } catch {
          toast("Failed to confirm transaction");
          return;
        }

        try {
          /**
           * @dev If having proposalId, sync proposal after process logics.
           */
          if (proposalId) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                try {
                  await programService.syncProposal(proposalId);
                } catch {}
                resolve(true);
              }, 4000);
            });
          }

          /**
           * @dev Close modal & callback.
           * */
          props.handleOk(proposalId);
        } catch (err) {
          console.log(err);
        }
      }

      /**
       * @dev Update current step.
       */
      setCurrentStep((prev) => prev + 1);

      /**
       * @dev Restrict slide animation to next step.
       */
      stepperRef.current.nextHandler();
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [currentStep, fnc, proposalId]);

  /**
   * @dev The function to initilize bussinness logic
   */
  const handleLogic = useCallback(async () => {
    /**
     * @dev Handle to process instructions.
     */
    const data = (await props.instructionHandler()) as unknown as {
      proposalId: string;
      fnc: {
        optimize(): Promise<void>;
        confirm(): Promise<void>;
      };
    };

    /**
     * @dev Assign optimize function & confirm function.
     */
    setFnc(data?.fnc);

    /**
     * @dev Assign proposal id.
     */
    setProposalId(data?.proposalId);

    /**
     * @dev This mean the transaction do not need to optimize, ignore optimized step.
     */
    if (!data.fnc.optimize) {
      /**
       * @dev Update current step.
       */
      setCurrentStep((prev) => prev + 1);

      /**
       * @dev Restrict slide animation to next step.
       */
      stepperRef.current.nextHandler();
    }
  }, [props.instructionHandler]);

  useEffect(() => {
    if (!props.isModalOpen) return;
    handleLogic();
  }, [props.isModalOpen, props.instructionHandler]);

  return (
    <Modal
      title={<p className="text-2xl">Optimize transaction</p>}
      open={props.isModalOpen}
      onOk={() => props.handleOk}
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
            <Button
              onClick={handleNextStep}
              disabled={loading}
              loading={loading}
              text={`${currentStep === 0 ? "Optimize" : "Confirm"} transaction`}
              width="100%"
            >
              Optimize
            </Button>
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
