import createSagaMiddleware from "redux-saga";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducer, { initState } from "./reducer";
import saga from "./saga";

export default function makeStore() {
  const middleware = createSagaMiddleware();
  const store = createStore(reducer, initState, applyMiddleware(middleware));
  middleware.run(saga);
  return store;
}
