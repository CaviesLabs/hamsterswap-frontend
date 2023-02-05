/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC,
  useReducer,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
import {
  StepStates,
  ProgressStep,
  StepProgressProps,
  ReducerAction,
  StepProgressHandler,
} from "./types";
import classnames from "classnames";
import styles from "./styles.module.css";

/**
 * @dev Define step reducer.
 * @param {ProgressStep[]} steps.
 * @param {ReducerAction} action.
 * @returns {ProgressStep[]}.
 */
const stepsReducer = (
  steps: ProgressStep[],
  action: ReducerAction
): ProgressStep[] => {
  return steps.map(function (step, i) {
    if (i < action.payload.index) {
      step.state = StepStates.COMPLETED;
    } else if (i === action.payload.index) {
      step.state = action.payload.state;
    } else {
      step.state = StepStates.NOT_STARTED;
    }
    return step;
  });
};

export const Ref: ForwardRefRenderFunction<
  StepProgressHandler,
  StepProgressProps
> = (props, ref) => {
  const {
    steps,
    startingStep,
    wrapperClass,
    progressClass,
    stepClass,
    labelClass,
    subtitleClass,
    onSubmit,
  } = props;
  const [state, dispatch] = useReducer(stepsReducer, steps);
  const [currentIndex, setCurrentIndex] = useState(startingStep);

  useEffect(function () {
    dispatch({
      type: "init",
      payload: { index: currentIndex, state: StepStates.CURRENT },
    });
  }, []);

  /**
   * @dev Expose next and previous function.
   */
  useImperativeHandle(ref, () => ({
    /**
     * @dev Define function to handle going to next step.
     * @returns {Function}
     */
    nextHandler: () => {
      if (currentIndex === steps.length - 1) {
        return;
      }

      /**
       * @dev Check validation, if validate go Next.
       */
      let isStateValid = true;
      const stepValidator = state[currentIndex].validator;
      if (stepValidator) {
        isStateValid = stepValidator();
      }

      dispatch({
        type: "next",
        payload: {
          index: isStateValid ? currentIndex + 1 : currentIndex,
          state: isStateValid ? StepStates.CURRENT : StepStates.ERROR,
        },
      });

      if (isStateValid) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    /**
     * @dev Define function to handle going to previous step.
     * @returns {Function}
     */
    prevHandler: () => {
      if (currentIndex === 0) {
        return;
      }
      dispatch({
        type: "previous",
        payload: {
          index: currentIndex - 1,
          state: StepStates.CURRENT,
        },
      });
      setCurrentIndex(currentIndex - 1);
    },
  }));

  return (
    <div className={`${styles["progress-bar-wrapper"]} ${wrapperClass || ""}`}>
      <ul className={`${styles["step-progress-bar"]} ${progressClass || ""}`}>
        {state.map(function (step, i) {
          return (
            <li
              key={`stepper-${i}`}
              className={`${styles["progress-step"]} ${styles[props.theme]}${
                step.state === StepStates.COMPLETED
                  ? ` ${styles.completed}`
                  : ""
              }${
                step.state === StepStates.CURRENT ? ` ${styles.current}` : ""
              }${
                step.state === StepStates.ERROR ? ` ${styles["has-error"]}` : ""
              } ${stepClass || ""}`}
            >
              {step.state === StepStates.COMPLETED && (
                <span
                  className={`${styles["step-icon"]} ${styles[props.theme]}`}
                >
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 13 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.5L4.5 7.5L12 1"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              )}
              {step.state === StepStates.ERROR && (
                <span className={styles["step-icon"]}>!</span>
              )}
              {step.state !== StepStates.COMPLETED &&
                step.state !== StepStates.ERROR && (
                  <span
                    className={`${styles["step-index"]} ${styles[props.theme]}`}
                  >
                    {i + 1}
                  </span>
                )}
              <div
                className={`${styles["step-label"]} ${labelClass || ""} ${
                  step.state === StepStates.CURRENT && "semi-bold"
                }`}
              >
                {step.label}
                {step.subtitle && (
                  <div
                    className={`${styles["step-label-subtitle"]} ${
                      subtitleClass || ""
                    }`}
                  >
                    {step.subtitle}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {!props.hiddenContent && (
        <div className="relative">
          <div className="absolute w-full top-14 left-0">
            <div className="flex">
              {state.map((step, i) => (
                <div className="w-1/5" key={`active-marker-${i}`}>
                  <div
                    className={classnames(
                      "mx-auto",
                      step.state === StepStates.CURRENT && styles.triangleUp
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const StepProgressBar = forwardRef(Ref);

export type StepProgressHandle = React.ElementRef<typeof StepProgressBar>;
