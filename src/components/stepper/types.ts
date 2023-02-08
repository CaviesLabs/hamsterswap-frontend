/** @dev Define enum for step state. */
export enum StepStates {
  NOT_STARTED = "not_started",
  CURRENT = "current",
  ERROR = "error",
  COMPLETED = "completed",
}

/** @dev Define progress step interface. */
export interface ProgressStep {
  label: string;
  subtitle?: string;
  name: string;
  state?: StepStates;
  content?: React.ReactNode;
  validator?: (payload?: any) => boolean;
}

/** @dev Define props interface. */
export interface StepProgressProps {
  steps: ProgressStep[];
  startingStep: number;
  wrapperClass?: string;
  progressClass?: string;
  stepClass?: string;
  labelClass?: string;
  subtitleClass?: string;
  contentClass?: string;
  buttonWrapperClass?: string;
  primaryBtnClass?: string;
  secondaryBtnClass?: string;
  submitBtnName?: string;
  onSubmit(): void;
  previousBtnName?: string;
  nextBtnName?: string;
  hiddenContent?: boolean;
  theme?: "primary" | "secondary";
}

/** @dev Define props interface. */
export interface ReducerAction {
  type: string;
  payload: { index: number; state: StepStates };
}

/** @dev Define props interface. */
export type StepProgressHandler = {
  nextHandler(): void;
  prevHandler(): void;
};
