import * as actionTypes from "../actions/actionTypes";
import { updateObject, shuffleCards } from "../../shared/utility";

const initialState = {
  cards: [],
  noOfPairs: 10,
  score: 0,
  noOfTries: 0,
  flippedCardsId: [],
  matchedCards: [],
  selectedIndex: null,
  gameOver: false
};

//a reducer to set number of pairs on user select
const setNoOfPairs = (state, action) => {
  return updateObject(initialState, { noOfPairs: action.number });
};

//this to generate array with the length of (no of pairs*2) and shuffle it
const createDeck = (state, action) => {
  let cardList = [];
  for (let i = 1; i <= state.noOfPairs; i++) {
    cardList.push({ id: i + "-1", name: `pair-${i}`, flipped: true, matched: false });
    cardList.push({ id: i + "-2", name: `pair-${i}`, flipped: true, matched: false });
  }
  return updateObject(state, {
    cards: shuffleCards(cardList),
    flippedCardsId: Array.from(Array(2 * state.noOfPairs).keys()),
  });
};

const hideCards = (state, action) => {
  let cardsHided = state.cards.map((card) => {
    return { ...card, flipped: false };
  });
  return updateObject(state, {
    cards: cardsHided,
    flippedCardsId: [],
  });
};

//function to set flipped to true when the user clicks a card
const flipCard = (state, action) => {
  if (state.flippedCardsId.length == 2) return;

  let temp = state.cards;
  state.cards[action.index].flipped = true;
  temp[action.index].flipped = true;
  return updateObject(state, {
    flippedCardsId: [...state.flippedCardsId, action.index],
    selectedIndex: action.index,
  });
};

//a function to restart the game
const restartGame = (state, action) => {
  return updateObject(initialState, { gameOver: false, noOfPairs:state.noOfPairs });
};

//when two cards match, add the indexes to the matched array and set card.match=true
const matchedCards = (state, action) => {
  let matched = [...state.matchedCards, ...state.flippedCardsId];

  state.cards[state.flippedCardsId[0]].matched = true;
  state.cards[state.selectedIndex].matched = true;

  return updateObject(state, {
    flippedCardsId: [],
    selectedIndex: null,
    matchedCards: matched,
    noOfTries: state.noOfTries + 1,
    score: state.score + 1,
    gameOver: matched.length === 2 * state.noOfPairs,
  });
};

//a function to reset the cards again after checkMatch
const resetCards = (state, action) => {
  return updateObject(state, {
    flippedCardsId: [],
    selectedIndex: null,
    noOfTries: state.noOfTries + 1,
  });
};

const initDeck = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FLIP_CARD:
      return flipCard(state, action);
    case actionTypes.CREATE_DECK:
      return createDeck(state, action);
    case actionTypes.HIDE_CARDS:
      return hideCards(state, action);
    case actionTypes.MATCHED_CARDS:
      return matchedCards(state, action);
    case actionTypes.RESET_CARDS:
      return resetCards(state, action);
    case actionTypes.RESTART_GAME:
      return restartGame(state, action);
    case actionTypes.SET_NO_OF_PAIRS:
      return setNoOfPairs(state, action);
    default:
      return state;
  }
};

export default initDeck;
