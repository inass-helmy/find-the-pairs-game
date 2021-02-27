import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";

import Deck from "./reducers/Deck";
import rootSaga from "./sagas/Deck";

const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(Deck, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
const wrapper = createWrapper(makeStore);

export default wrapper;
