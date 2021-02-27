import * as actionTypes from "./actionTypes";

export function createDeck() {
  return { type: actionTypes.CREATE_DECK };
}

export function hideCards() {
  return { type: actionTypes.HIDE_CARDS };
}

export function startGame() {
  return { type: actionTypes.START_GAME };
}

export function flipCard(index, id) {
  return { type: actionTypes.FLIP_CARD, index, id };
}

export function setNoOfPairs(number) {
  return { type: actionTypes.SET_NO_OF_PAIRS, number };
}

export function setMatchedCards(index) {
  return { type: actionTypes.SET_MATCHED_CARDS, index };
}

export function resetCardsTimeout() {
  return { type: actionTypes.RESET_CARDS_TIMEOUT };
}

export function matchedCards() {
  return { type: actionTypes.MATCHED_CARDS };
}

export function resetCards() {
  return { type: actionTypes.RESET_CARDS };
}

export function restartGame() {
  return { type: actionTypes.RESTART_GAME };
}
