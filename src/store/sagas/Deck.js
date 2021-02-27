import { all, put, takeLatest, delay, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/index";
import * as actionTypes from "../actions/actionTypes";

export function* watchDeck() {
  yield takeLatest(actionTypes.START_GAME, function* () {
    yield put(actions.createDeck());
    yield delay(5000);
    yield put(actions.hideCards());
  });
}

export function* watchCard() {
  yield takeEvery(actionTypes.SET_MATCHED_CARDS, function* () {
    yield delay(1000);
    yield put(actions.matchedCards());
  });

  yield takeEvery(actionTypes.RESET_CARDS_TIMEOUT, function* () {
    yield delay(1000);
    yield put(actions.resetCards());
  });
}

export default function* rootSaga() {
  yield all([watchDeck(), watchCard()]);
}
