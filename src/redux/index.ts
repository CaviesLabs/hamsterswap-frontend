import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { useSelector as useReduxSelector } from "react-redux";
import State from "@/src/redux/entities/state";
import reducer, { initState } from "./reducer";
import saga from "./saga";

export default function makeStore() {
  const middleware = createSagaMiddleware();
  const store = createStore(reducer, initState, applyMiddleware(middleware));
  middleware.run(saga);
  return store;
}

/**
 * @dev Custom hooks to get redux state
 * @notice Avoid using this hook in components, use useSelector from react-redux instead
 * @returns {State} redux state
 */
export const useSelector = () => useReduxSelector((state: State) => state);
