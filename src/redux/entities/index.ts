export type CallBackSaga<T> = (response: T) => void;

export type SagaPayload<RequestPayload, Response> = {
  payload?: RequestPayload;
  callback?: CallBackSaga<Response>;
};
